import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Property name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['apartment', 'house', 'condo', 'villa', 'studio', 'room']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'US'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    caption: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  amenities: [{
    type: String,
    trim: true
  }],
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: [0, 'Bedrooms cannot be negative']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: [0, 'Bathrooms cannot be negative']
  },
  maxGuests: {
    type: Number,
    required: [true, 'Maximum guests is required'],
    min: [1, 'Must accommodate at least 1 guest']
  },
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    cleaningFee: {
      type: Number,
      default: 0,
      min: [0, 'Cleaning fee cannot be negative']
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: [0, 'Security deposit cannot be negative']
    },
    weeklyDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    monthlyDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    }
  },
  availability: {
    minNights: {
      type: Number,
      default: 1,
      min: [1, 'Minimum nights must be at least 1']
    },
    maxNights: {
      type: Number,
      default: 365,
      min: [1, 'Maximum nights must be at least 1']
    },
    advanceNotice: {
      type: Number,
      default: 2,
      min: [0, 'Advance notice cannot be negative']
    },
    checkInTime: {
      type: String,
      default: '15:00'
    },
    checkOutTime: {
      type: String,
      default: '11:00'
    }
  },
  externalListings: [{
    platform: {
      type: String,
      enum: ['airbnb', 'booking', 'vrbo', 'expedia'],
      required: true
    },
    listingId: {
      type: String,
      required: true
    },
    url: String,
    syncEnabled: {
      type: Boolean,
      default: true
    },
    lastSyncAt: Date
  }],
  aiSettings: {
    dynamicPricing: {
      enabled: {
        type: Boolean,
        default: true
      },
      minPrice: Number,
      maxPrice: Number,
      strategy: {
        type: String,
        enum: ['conservative', 'moderate', 'aggressive'],
        default: 'moderate'
      }
    },
    autoMessaging: {
      enabled: {
        type: Boolean,
        default: false
      }
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
propertySchema.index({ tenantId: 1, status: 1 });
propertySchema.index({ 'address.city': 1, 'address.state': 1 });
propertySchema.index({ type: 1, maxGuests: 1 });

// Virtual for full address
propertySchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
});

// Virtual for occupancy rate (would be calculated from bookings)
propertySchema.virtual('occupancyRate').get(function() {
  // This would be calculated from actual bookings data
  return 0;
});

export default mongoose.model('Property', propertySchema);