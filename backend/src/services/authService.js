const User = require('../models/User');
const { ApiError } = require('../middleware/errorHandler');

/**
 * Auth Service
 * Handles business logic for user authentication.
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} data - { name, email, password, profilePicture }
   * @returns {Object} - { user, token }
   */
  async register({ name, email, password, profilePicture }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError('A user with this email already exists.', 400);
    }

    const user = await User.create({ name, email, password, profilePicture });

    const token = user.getSignedJwtToken();

    user.password = undefined;

    return { user, token };
  },

  /**
   * Login user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Object} - { user, token }
   */
  async login(email, password) {
    if (!email || !password) {
      throw new ApiError('Please provide an email and password.', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new ApiError('Invalid credentials.', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new ApiError('Invalid credentials.', 401);
    }

    const token = user.getSignedJwtToken();

    user.password = undefined;

    return { user, token };
  },
};

module.exports = authService;
