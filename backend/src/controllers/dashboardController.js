const asyncHandler = require('../middleware/asyncHandler');
const dashboardService = require('../services/dashboardService');

/**
 * @desc    Get dashboard statistics for authenticated user
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
const getStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getStats(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Dashboard statistics retrieved.',
    data: { stats },
  });
});

module.exports = { getStats };
