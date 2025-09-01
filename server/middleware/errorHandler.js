import mongoose from 'mongoose';

export const errorHandler = (error, req, res, next) => {
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error'
  };

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map(val => val.message).join(', ');
    customError.statusCode = 400;
    customError.message = message;
  }

  // Mongoose duplicate key error
  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    customError.statusCode = 400;
    customError.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Mongoose cast error (invalid ObjectId)
  if (error.name === 'CastError') {
    customError.statusCode = 400;
    customError.message = 'Resource not found';
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    customError.statusCode = 401;
    customError.message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    customError.statusCode = 401;
    customError.message = 'Token expired';
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', {
      message: error.message,
      stack: error.stack,
      statusCode: customError.statusCode,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user?.id,
      tenant: req.tenant?.id
    });
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: error.stack,
      error: error 
    })
  });
};

// Async error handler wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};