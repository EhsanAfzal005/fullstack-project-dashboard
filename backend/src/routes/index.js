const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const dashboardRoutes = require('./dashboardRoutes');

/**
 * Route Aggregator
 * Mounts all route modules under their respective base paths.
 */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
