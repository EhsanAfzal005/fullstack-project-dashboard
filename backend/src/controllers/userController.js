const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../middleware/errorHandler');

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Profile retrieved.',
    data: { user },
  });
});

/**
 * @desc    Update user profile (name, email, profilePicture)
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, profilePicture } = req.body;

  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (email !== undefined) updateFields.email = email;
  if (profilePicture !== undefined) updateFields.profilePicture = profilePicture;

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError('Please provide at least one field to update.', 400);
  }

  const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully.',
    data: { user },
  });
});

/**
 * @desc    Update password
 * @route   PUT /api/users/password
 * @access  Private
 */
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError('Please provide current and new password.', 400);
  }

  if (newPassword.length < 6) {
    throw new ApiError('New password must be at least 6 characters.', 400);
  }

  const user = await User.findById(req.user.id).select('+password');

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw new ApiError('Current password is incorrect.', 401);
  }

  user.password = newPassword;
  await user.save();

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully.',
    data: { token },
  });
});

module.exports = { getProfile, updateProfile, updatePassword };
