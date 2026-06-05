/**
 * Custom API Error class
 * Extends the native Error with an HTTP status code
 * and an isOperational flag for distinguishing
 * expected errors from programming bugs.
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Centralized Error Handler Middleware
 * Converts various error types into consistent JSON responses.
 * Handles: Mongoose ValidationError, CastError, duplicate key (11000),
 * JWT errors, and custom ApiError instances.
 */
const errorHandler = (err, req, res, next) => {
  let error = {
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
  };

  // ── Mongoose bad ObjectId (CastError) ──
  if (err.name === 'CastError') {
    error.message = `Resource not found with id: ${err.value}`;
    error.statusCode = 404;
  }

  // ── Mongoose duplicate key error ──
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `Duplicate value entered for '${field}'. Please use a different value.`;
    error.statusCode = 400;
  }

  // ── Mongoose validation error ──
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    error.message = messages.join('. ');
    error.statusCode = 400;
  }

  // ── JWT invalid token ──
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token. Please log in again.';
    error.statusCode = 401;
  }

  // ── JWT expired token ──
  if (err.name === 'TokenExpiredError') {
    error.message = 'Token has expired. Please log in again.';
    error.statusCode = 401;
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { ApiError, errorHandler };
