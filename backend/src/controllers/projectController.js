const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../middleware/errorHandler');
const projectService = require('../services/projectService');

const VALID_STATUSES = ['Pending', 'In Progress', 'Completed'];

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError('Project title is required.', 400);
  }

  if (status && !VALID_STATUSES.includes(status)) {
    throw new ApiError(
      `Invalid status '${status}'. Must be one of: ${VALID_STATUSES.join(', ')}`,
      400
    );
  }

  const project = await projectService.create(
    { title: title.trim(), description, status },
    req.user.id
  );

  res.status(201).json({
    success: true,
    message: 'Project created successfully.',
    data: { project },
  });
});

/**
 * @desc    Get all projects (with search, filter, sort, pagination)
 * @route   GET /api/projects
 * @access  Private
 */
const getProjects = asyncHandler(async (req, res) => {
  const result = await projectService.findAll(req.user.id, req.query);

  res.status(200).json({
    success: true,
    message: 'Projects retrieved.',
    data: result,
  });
});

/**
 * @desc    Get a single project by ID
 * @route   GET /api/projects/:id
 * @access  Private
 */
const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.findById(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: 'Project retrieved.',
    data: { project },
  });
});

/**
 * @desc    Update a project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (status && !VALID_STATUSES.includes(status)) {
    throw new ApiError(
      `Invalid status '${status}'. Must be one of: ${VALID_STATUSES.join(', ')}`,
      400
    );
  }

  const updateData = {};
  if (title !== undefined) updateData.title = title.trim();
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  if (Object.keys(updateData).length === 0) {
    throw new ApiError('Please provide at least one field to update.', 400);
  }

  const project = await projectService.update(req.params.id, req.user.id, updateData);

  res.status(200).json({
    success: true,
    message: 'Project updated successfully.',
    data: { project },
  });
});

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = asyncHandler(async (req, res) => {
  await projectService.delete(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully.',
    data: {},
  });
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
