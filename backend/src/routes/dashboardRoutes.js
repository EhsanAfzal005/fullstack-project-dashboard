const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

// All dashboard routes are protected
router.use(protect);

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics for the authenticated user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalProjects:
 *                           type: integer
 *                           example: 12
 *                         completed:
 *                           type: integer
 *                           example: 5
 *                         pending:
 *                           type: integer
 *                           example: 4
 *                         inProgress:
 *                           type: integer
 *                           example: 3
 *       401:
 *         description: Not authorized
 */
router.get('/stats', getStats);

module.exports = router;
