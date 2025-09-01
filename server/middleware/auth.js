import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Tenant from '../models/Tenant.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId)
      .populate('tenantId')
      .select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Token is not valid' 
      });
    }

    // Check if tenant is active
    if (user.tenantId.status !== 'active') {
      return res.status(403).json({ 
        success: false,
        message: 'Account suspended' 
      });
    }

    // Attach user and tenant to request
    req.user = user;
    req.tenant = user.tenantId;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Server error during authentication' 
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'Insufficient permissions' 
      });
    }

    next();
  };
};

export const checkSubscription = (feature = null) => {
  return (req, res, next) => {
    if (!req.tenant) {
      return res.status(403).json({ 
        success: false,
        message: 'Tenant information required' 
      });
    }

    // Check if subscription is active
    if (!req.tenant.isSubscriptionActive) {
      return res.status(402).json({ 
        success: false,
        message: 'Subscription required' 
      });
    }

    // Check if specific feature is available
    if (feature && !req.tenant.hasFeature(feature)) {
      return res.status(403).json({ 
        success: false,
        message: `Feature '${feature}' not available in current plan` 
      });
    }

    next();
  };
};

export const checkUsageLimit = (resource) => {
  return (req, res, next) => {
    if (!req.tenant) {
      return res.status(403).json({ 
        success: false,
        message: 'Tenant information required' 
      });
    }

    if (!req.tenant.checkLimit(resource)) {
      return res.status(429).json({ 
        success: false,
        message: `Usage limit exceeded for ${resource}` 
      });
    }

    next();
  };
};