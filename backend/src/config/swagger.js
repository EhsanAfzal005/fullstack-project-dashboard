const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FS-APP-DASH API',
      version: '1.0.0',
      description:
        'A production-ready REST API for project management with JWT authentication, CRUD operations, dashboard analytics, and more.',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
            name: { type: 'string', example: 'Ehsan Afzal' },
            email: { type: 'string', example: 'john@example.com' },
            profilePicture: { type: 'string', example: 'https://example.com/avatar.jpg' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
            title: { type: 'string', example: 'CRM Application' },
            description: { type: 'string', example: 'A customer relationship management tool' },
            status: { type: 'string', enum: ['Pending', 'In Progress', 'Completed'], example: 'In Progress' },
            owner: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message here' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User profile management' },
      { name: 'Projects', description: 'Project CRUD operations' },
      { name: 'Dashboard', description: 'Dashboard analytics' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
