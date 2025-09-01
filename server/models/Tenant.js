import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tenant name is required'],
    trim: true,
    maxlength: [100, 'Tenant name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  domain: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  logo: {
    url: String,
    publicId: String
  },
  settings: {
    currency: {
      type: String,
      default: 'USD'
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    dateFormat: {
      type: String,
      default: 'MM/DD/YYYY'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  integrations: {
    airbnb: {
      enabled: {
        type: Boolean,
        default: false
      },
      apiKey: String,
      apiSecret: String,
      lastSyncAt: Date
    },
    booking: {
      enabled: {
        type: Boolean,
        default: false
      },
      apiKey: String,
      lastSyncAt: Date
    },
    stripe: {
      enabled: {
        type: Boolean,
        default: false
      },
      publishableKey: String,
      secretKey: String,
      webhookSecret: String
    },
    cloudinary: {
      cloudName: String,
      apiKey: String,
      apiSecret: String
    },
    googleMaps: {
      apiKey: String
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['trial', 'starter', 'professional', 'enterprise'],
      default: 'trial'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'past_due'],
      default: 'active'
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    trialEndsAt: {
      type: Date,
      default: function() {
        return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days trial
      }
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    }
  },
  limits: {
    properties: {
      type: Number,
      default: function() {
        const limits = {
          trial: 3,
          starter: 3,
          professional: 15,
          enterprise: -1 // unlimited
        };
        return limits[this.subscription?.plan] || limits.trial;
      }
    },
    users: {
      type: Number,
      default: function() {
        const limits = {
          trial: 1,
          starter: 1,
          professional: 5,
          enterprise: -1 // unlimited
        };
        return limits[this.subscription?.plan] || limits.trial;
      }
    },
    apiCalls: {
      type: Number,
      default: function() {
        const limits = {
          trial: 1000,
          starter: 1000,
          professional: 10000,
          enterprise: -1 // unlimited
        };
        return limits[this.subscription?.plan] || limits.trial;
      }
    }
  },
  usage: {
    properties: {
      type: Number,
      default: 0
    },
    users: {
      type: Number,
      default: 1
    },
    apiCalls: {
      current: {
        type: Number,
        default: 0
      },
      resetAt: {
        type: Date,
        default: function() {
          const now = new Date();
          return new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
      }
    }
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
tenantSchema.index({ slug: 1 });
tenantSchema.index({ domain: 1 });
tenantSchema.index({ 'subscription.status': 1 });

// Virtual for checking if trial is active
tenantSchema.virtual('isTrialActive').get(function() {
  return this.subscription.plan === 'trial' && 
         this.subscription.trialEndsAt > new Date();
});

// Virtual for checking if subscription is active
tenantSchema.virtual('isSubscriptionActive').get(function() {
  return ['active'].includes(this.subscription.status) &&
         (this.subscription.plan !== 'trial' || this.isTrialActive);
});

// Method to check if feature is available
tenantSchema.methods.hasFeature = function(feature) {
  const features = {
    trial: ['basic_properties', 'basic_bookings'],
    starter: ['basic_properties', 'basic_bookings', 'basic_analytics'],
    professional: ['basic_properties', 'basic_bookings', 'basic_analytics', 'ai_pricing', 'team_collaboration'],
    enterprise: ['basic_properties', 'basic_bookings', 'basic_analytics', 'ai_pricing', 'team_collaboration', 'custom_ai', 'api_access', 'white_label']
  };
  
  return features[this.subscription.plan]?.includes(feature) || false;
};

// Method to check usage limits
tenantSchema.methods.checkLimit = function(resource) {
  const limit = this.limits[resource];
  const usage = this.usage[resource];
  
  if (limit === -1) return true; // unlimited
  
  return (typeof usage === 'object' ? usage.current : usage) < limit;
};

export default mongoose.model('Tenant', tenantSchema);