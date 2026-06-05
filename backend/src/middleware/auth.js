const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');
const { ApiError } = require('./errorHandler');

/**
 * Authentication Middleware
 * Verifies JWT from the Authorization header (Bearer scheme),
 * finds the user in the database, and attaches it to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError('Not authorized. No token provided.', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError('User belonging to this token no longer exists.', 401);
  }

  req.user = user;
  next();
});

module.exports = { protect };
