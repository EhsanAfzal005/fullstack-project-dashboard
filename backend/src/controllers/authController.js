const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../middleware/errorHandler');
const authService = require('../services/authService');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !email || !password) {
    throw new ApiError('Please provide name, email, and password.', 400);
  }

  if (password.length < 6) {
    throw new ApiError('Password must be at least 6 characters.', 400);
  }

  const { user, token } = await authService.register({
    name,
    email,
    password,
    profilePicture,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    data: { user, token },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: { user, token },
  });
});

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User profile retrieved.',
    data: { user: req.user },
  });
});

module.exports = { register, login, getMe };
