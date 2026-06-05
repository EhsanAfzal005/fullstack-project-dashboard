const Project = require('../models/Project');
const { ApiError } = require('../middleware/errorHandler');

/**
 * Project Service
 * Handles business logic for project CRUD operations.
 * All operations are scoped to the authenticated user (owner).
 */
const projectService = {
  /**
   * Create a new project
   * @param {Object} data - { title, description, status }
   * @param {string} userId - Authenticated user ID
   * @returns {Object} - Created project document
   */
  async create(data, userId) {
    const project = await Project.create({
      ...data,
      owner: userId,
    });
    return project;
  },

  /**
   * Get all projects for a user with search, filter, sort, and pagination.
   *
   * @param {string} userId - Authenticated user ID
   * @param {Object} queryParams - { search, status, sort, order, page, limit }
   * @returns {Object} - { projects, pagination }
   */
  async findAll(userId, queryParams) {
    const {
      search,
      status,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = queryParams;

    // Build filter query — always scoped to the user
    const filter = { owner: userId };

    // Search by title (case-insensitive partial match)
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Filter by status
    if (status) {
      const validStatuses = ['Pending', 'In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        throw new ApiError(
          `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`,
          400
        );
      }
      filter.status = status;
    }

    // Pagination calculation
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100); // Max 100 per page
    const skip = (pageNum - 1) * limitNum;

    // Sort direction
    const sortOrder = order === 'asc' ? 1 : -1;

    // Allowed sort fields
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'status'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt';

    // Execute query with count in parallel for performance
    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments(filter),
    ]);

    return {
      projects,
      pagination: {
        total,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        pageSize: limitNum,
      },
    };
  },

  /**
   * Get a single project by ID (owner-scoped)
   * @param {string} projectId
   * @param {string} userId
   * @returns {Object} - Project document
   */
  async findById(projectId, userId) {
    const project = await Project.findOne({ _id: projectId, owner: userId });

    if (!project) {
      throw new ApiError('Project not found.', 404);
    }

    return project;
  },

  /**
   * Update a project (owner-scoped)
   * @param {string} projectId
   * @param {string} userId
   * @param {Object} data - Fields to update
   * @returns {Object} - Updated project document
   */
  async update(projectId, userId, data) {
    // Prevent changing the owner field
    delete data.owner;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, owner: userId },
      data,
      { new: true, runValidators: true }
    );

    if (!project) {
      throw new ApiError('Project not found.', 404);
    }

    return project;
  },

  /**
   * Delete a project (owner-scoped)
   * @param {string} projectId
   * @param {string} userId
   * @returns {Object} - Deleted project document
   */
  async delete(projectId, userId) {
    const project = await Project.findOneAndDelete({ _id: projectId, owner: userId });

    if (!project) {
      throw new ApiError('Project not found.', 404);
    }

    return project;
  },
};

module.exports = projectService;
