import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property is required']
  },
  guest: {
    name: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Guest email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    guests: {
      adults: {
        type: Number,
        required: true,
        min: [1, 'Must have at least 1 adult']
      },
      children: {
        type: Number,
        default: 0,
        min: [0, 'Children cannot be negative']
      },
      infants: {
        type: Number,
        default: 0,
        min: [0, 'Infants cannot be negative']
      }
    }
  },
  dates: {
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required']
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required']
    }
  },
  pricing: {
    baseAmount: {
      type: Number,
      required: [true, 'Base amount is required'],
      min: [0, 'Base amount cannot be negative']
    },
    cleaningFee: {
      type: Number,
      default: 0,
      min: [0, 'Cleaning fee cannot be negative']
    },
    serviceFee: {
      type: Number,
      default: 0,
      min: [0, 'Service fee cannot be negative']
    },
    taxes: {
      type: Number,
      default: 0,
      min: [0, 'Taxes cannot be negative']
    },
    discounts: {
      weekly: {
        type: Number,
        default: 0
      },
      monthly: {
        type: Number,
        default: 0
      },
      promotional: {
        type: Number,
        default: 0
      }
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'bank_transfer', 'paypal'],
      required: [true, 'Payment method is required']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'partially_paid', 'failed', 'refunded'],
      default: 'pending'
    },
    stripePaymentIntentId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'],
    default: 'pending'
  },
  source: {
    platform: {
      type: String,
      enum: ['direct', 'airbnb', 'booking', 'vrbo', 'expedia'],
      default: 'direct'
    },
    externalId: String,
    channelCommission: {
      type: Number,
      default: 0
    }
  },
  communication: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'platform_message'],
      required: true
    },
    subject: String,
    message: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    sentBy: {
      type: String,
      enum: ['system', 'ai', 'user'],
      default: 'system'
    }
  }],
  notes: {
    internal: String,
    guestInstructions: String
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
bookingSchema.index({ tenantId: 1, status: 1 });
bookingSchema.index({ property: 1, 'dates.checkIn': 1, 'dates.checkOut': 1 });
bookingSchema.index({ 'guest.email': 1 });
bookingSchema.index({ 'payment.status': 1 });

// Virtual for total guests
bookingSchema.virtual('totalGuests').get(function() {
  return this.guest.guests.adults + this.guest.guests.children + this.guest.guests.infants;
});

// Virtual for number of nights
bookingSchema.virtual('numberOfNights').get(function() {
  if (!this.dates.checkIn || !this.dates.checkOut) return 0;
  const timeDiff = this.dates.checkOut.getTime() - this.dates.checkIn.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

// Validate check-in/check-out dates
bookingSchema.pre('save', function(next) {
  if (this.dates.checkIn >= this.dates.checkOut) {
    next(new Error('Check-out date must be after check-in date'));
  } else {
    next();
  }
});

// Prevent overlapping bookings for the same property
bookingSchema.index(
  { 
    property: 1, 
    'dates.checkIn': 1, 
    'dates.checkOut': 1 
  },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ['confirmed', 'checked_in'] }
    }
  }
);

export default mongoose.model('Booking', bookingSchema);