const Project = require('../models/Project');

/**
 * Dashboard Service
 * Handles analytics aggregation for the dashboard.
 * All stats are scoped to the authenticated user.
 */
const dashboardService = {
  /**
   * Get project statistics for a user using MongoDB aggregation.
   *
   * @param {string} userId - Authenticated user ID
   * @returns {Object} - { totalProjects, completed, pending, inProgress }
   */
  async getStats(userId) {
    const mongoose = require('mongoose');

    const stats = await Project.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(userId) } },

      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      totalProjects: 0,
      completed: 0,
      pending: 0,
      inProgress: 0,
    };

    stats.forEach((stat) => {
      result.totalProjects += stat.count;

      switch (stat._id) {
        case 'Completed':
          result.completed = stat.count;
          break;
        case 'Pending':
          result.pending = stat.count;
          break;
        case 'In Progress':
          result.inProgress = stat.count;
          break;
      }
    });

    return result;
  },
};

module.exports = dashboardService;
