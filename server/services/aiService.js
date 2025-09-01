import { GoogleGenerativeAI } from '@google/generative-ai';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

class AIService {
  constructor() {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.warn('⚠️  Google Gemini API key not found. AI features will be disabled.');
      this.genAI = null;
      return;
    }

    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateDynamicPricing(propertyId, dates, options = {}) {
    if (!this.genAI) {
      throw new Error('AI service not available');
    }

    try {
      // Get property data
      const property = await Property.findById(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      // Get historical booking data
      const historicalBookings = await Booking.find({
        property: propertyId,
        'dates.checkIn': { 
          $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) 
        },
        status: { $in: ['confirmed', 'checked_out'] }
      }).sort({ 'dates.checkIn': -1 });

      // Calculate occupancy rate and average pricing
      const totalBookings = historicalBookings.length;
      const averagePrice = historicalBookings.length > 0
        ? historicalBookings.reduce((sum, booking) => sum + booking.pricing.baseAmount, 0) / totalBookings
        : property.pricing.basePrice;

      // Get market context
      const checkInDate = new Date(dates.checkIn);
      const checkOutDate = new Date(dates.checkOut);
      const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      
      const seasonality = this.getSeasonality(checkInDate);
      const dayOfWeek = checkInDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Prepare AI prompt
      const prompt = `
        As an expert revenue management AI for short-term rentals, analyze the following data and provide pricing recommendations:

        **Property Details:**
        - Type: ${property.type}
        - Location: ${property.address.city}, ${property.address.state}
        - Base Price: $${property.pricing.basePrice}
        - Bedrooms: ${property.bedrooms}
        - Max Guests: ${property.maxGuests}
        - Amenities: ${property.amenities.join(', ')}

        **Historical Performance:**
        - Total Historical Bookings: ${totalBookings}
        - Average Historical Price: $${averagePrice.toFixed(2)}
        - AI Strategy: ${property.aiSettings.dynamicPricing.strategy || 'moderate'}

        **Booking Request:**
        - Check-in: ${dates.checkIn}
        - Check-out: ${dates.checkOut}
        - Number of Nights: ${numberOfNights}
        - Season: ${seasonality}
        - Is Weekend: ${isWeekend}

        **Market Conditions:**
        - Current occupancy trend: ${options.occupancyTrend || 'stable'}
        - Local events: ${options.localEvents || 'none'}
        - Competition level: ${options.competitionLevel || 'moderate'}

        Please provide:
        1. Recommended nightly rate (as a number)
        2. Pricing confidence score (1-100)
        3. Key factors influencing the price
        4. Revenue optimization tips

        Respond in JSON format:
        {
          "recommendedRate": number,
          "confidence": number,
          "factors": ["factor1", "factor2", ...],
          "optimizationTips": ["tip1", "tip2", ...],
          "reasoning": "explanation of pricing decision"
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Parse JSON response
      let aiResponse;
      try {
        // Extract JSON from response (in case there's additional text)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        aiResponse = JSON.parse(jsonMatch ? jsonMatch[0] : text);
      } catch (parseError) {
        console.error('Failed to parse AI response:', text);
        // Fallback to rule-based pricing
        aiResponse = this.getRuleBasedPricing(property, { 
          numberOfNights, 
          seasonality, 
          isWeekend,
          averagePrice 
        });
      }

      // Validate and constrain pricing
      const minPrice = property.aiSettings.dynamicPricing.minPrice || property.pricing.basePrice * 0.7;
      const maxPrice = property.aiSettings.dynamicPricing.maxPrice || property.pricing.basePrice * 2.0;

      aiResponse.recommendedRate = Math.max(minPrice, Math.min(maxPrice, aiResponse.recommendedRate));

      return {
        success: true,
        pricing: aiResponse,
        originalBasePrice: property.pricing.basePrice,
        marketData: {
          seasonality,
          isWeekend,
          numberOfNights,
          averagePrice: averagePrice.toFixed(2)
        }
      };

    } catch (error) {
      console.error('AI Pricing Error:', error);
      
      // Fallback to rule-based pricing
      const property = await Property.findById(propertyId);
      const fallbackPricing = this.getRuleBasedPricing(property, {
        numberOfNights: Math.ceil((new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24)),
        seasonality: this.getSeasonality(new Date(dates.checkIn)),
        isWeekend: new Date(dates.checkIn).getDay() === 0 || new Date(dates.checkIn).getDay() === 6
      });

      return {
        success: false,
        error: error.message,
        fallbackPricing: fallbackPricing,
        originalBasePrice: property.pricing.basePrice
      };
    }
  }

  getRuleBasedPricing(property, context) {
    let rate = property.pricing.basePrice;
    const factors = [];
    const optimizationTips = [];

    // Weekend premium
    if (context.isWeekend) {
      rate *= 1.2;
      factors.push('Weekend premium (+20%)');
    }

    // Seasonal adjustments
    if (context.seasonality === 'peak') {
      rate *= 1.3;
      factors.push('Peak season (+30%)');
    } else if (context.seasonality === 'low') {
      rate *= 0.8;
      factors.push('Low season (-20%)');
      optimizationTips.push('Consider promotional pricing for longer stays');
    }

    // Length of stay discounts
    if (context.numberOfNights >= 7) {
      rate *= 0.9;
      factors.push('Weekly discount (-10%)');
    } else if (context.numberOfNights >= 28) {
      rate *= 0.8;
      factors.push('Monthly discount (-20%)');
    }

    // Strategy adjustments
    if (property.aiSettings.dynamicPricing.strategy === 'aggressive') {
      rate *= 1.1;
      factors.push('Aggressive pricing strategy (+10%)');
    } else if (property.aiSettings.dynamicPricing.strategy === 'conservative') {
      rate *= 0.95;
      factors.push('Conservative pricing strategy (-5%)');
    }

    return {
      recommendedRate: Math.round(rate),
      confidence: 75,
      factors,
      optimizationTips,
      reasoning: 'Rule-based pricing fallback due to AI service unavailability'
    };
  }

  getSeasonality(date) {
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    
    // This is a simplified seasonality model - in production, this would be more sophisticated
    if (month >= 6 && month <= 8) {
      return 'peak'; // Summer
    } else if (month >= 12 || month <= 2) {
      return 'peak'; // Winter holidays
    } else if (month >= 3 && month <= 5) {
      return 'shoulder'; // Spring
    } else {
      return 'low'; // Fall
    }
  }

  async generateGuestMessage(type, context = {}) {
    if (!this.genAI) {
      return this.getFallbackMessage(type, context);
    }

    try {
      const prompt = `
        Generate a professional and friendly message for a short-term rental guest.
        
        **Message Type:** ${type}
        **Context:**
        - Guest Name: ${context.guestName || 'Guest'}
        - Property Name: ${context.propertyName || 'your rental'}
        - Check-in Date: ${context.checkIn || 'your check-in date'}
        - Check-out Date: ${context.checkOut || 'your check-out date'}
        - Additional Info: ${context.additionalInfo || 'none'}

        The message should be:
        - Professional yet warm
        - Clear and informative
        - Under 200 words
        - Include relevant details based on the message type

        Message types:
        - welcome: Welcome message with check-in instructions
        - confirmation: Booking confirmation
        - reminder: Check-in reminder (24 hours before)
        - checkout: Check-out instructions
        - thank_you: Thank you message after checkout

        Return only the message text, no additional formatting.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      
      return {
        success: true,
        message: response.text().trim()
      };

    } catch (error) {
      console.error('AI Message Generation Error:', error);
      return this.getFallbackMessage(type, context);
    }
  }

  getFallbackMessage(type, context) {
    const messages = {
      welcome: `Welcome to ${context.propertyName || 'your rental'}, ${context.guestName || 'dear guest'}! We're excited to host you. Check-in is at 3:00 PM. You'll receive detailed instructions 24 hours before your arrival. If you have any questions, please don't hesitate to reach out!`,
      
      confirmation: `Hi ${context.guestName || 'there'}! Your booking for ${context.propertyName || 'our property'} is confirmed for ${context.checkIn || 'your dates'}. We look forward to hosting you!`,
      
      reminder: `Hi ${context.guestName || 'there'}! Just a friendly reminder that you'll be checking in to ${context.propertyName || 'your rental'} tomorrow at 3:00 PM. Check your email for detailed instructions. Safe travels!`,
      
      checkout: `Thank you for staying with us, ${context.guestName || 'dear guest'}! Check-out is at 11:00 AM. Please leave the keys on the kitchen counter and ensure all windows are closed. We hope you enjoyed your stay!`,
      
      thank_you: `Thank you for choosing ${context.propertyName || 'our property'}, ${context.guestName || 'dear guest'}! We hope you had a wonderful stay. We'd love to welcome you back anytime!`
    };

    return {
      success: false,
      message: messages[type] || 'Thank you for your booking!',
      fallback: true
    };
  }

  async analyzeMarketTrends(propertyId, options = {}) {
    if (!this.genAI) {
      return this.getFallbackMarketAnalysis(propertyId);
    }

    try {
      // Get property and booking data
      const property = await Property.findById(propertyId);
      const recentBookings = await Booking.find({
        property: propertyId,
        'dates.checkIn': { 
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 3))
        }
      }).sort({ 'dates.checkIn': -1 });

      const prompt = `
        Analyze market trends for this short-term rental property:

        **Property:**
        - Location: ${property.address.city}, ${property.address.state}
        - Type: ${property.type}
        - Capacity: ${property.maxGuests} guests, ${property.bedrooms} bedrooms

        **Recent Performance (Last 3 months):**
        - Total Bookings: ${recentBookings.length}
        - Average Rate: $${recentBookings.length > 0 
          ? (recentBookings.reduce((sum, b) => sum + b.pricing.totalAmount, 0) / recentBookings.length).toFixed(2)
          : property.pricing.basePrice}

        Provide insights on:
        1. Market demand trends
        2. Seasonal patterns
        3. Competitive positioning recommendations
        4. Revenue optimization opportunities

        Respond in JSON format:
        {
          "demandTrend": "increasing|stable|decreasing",
          "seasonalInsights": ["insight1", "insight2"],
          "recommendations": ["rec1", "rec2"],
          "opportunityScore": number (1-100)
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      let analysis;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text);
      } catch (parseError) {
        analysis = this.getFallbackMarketAnalysis(propertyId);
      }

      return {
        success: true,
        analysis,
        dataPoints: {
          recentBookings: recentBookings.length,
          averageRate: recentBookings.length > 0 
            ? (recentBookings.reduce((sum, b) => sum + b.pricing.totalAmount, 0) / recentBookings.length).toFixed(2)
            : property.pricing.basePrice
        }
      };

    } catch (error) {
      console.error('Market Analysis Error:', error);
      return {
        success: false,
        error: error.message,
        fallbackAnalysis: this.getFallbackMarketAnalysis(propertyId)
      };
    }
  }

  getFallbackMarketAnalysis(propertyId) {
    return {
      demandTrend: "stable",
      seasonalInsights: [
        "Summer months typically show higher demand",
        "Weekend bookings tend to have premium pricing opportunities"
      ],
      recommendations: [
        "Monitor competitor pricing regularly",
        "Consider implementing dynamic pricing for weekends",
        "Optimize listing photos and description for better conversion"
      ],
      opportunityScore: 75
    };
  }
}

export default new AIService();