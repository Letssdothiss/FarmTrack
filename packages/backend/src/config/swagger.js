import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FarmTrack API',
      version: '1.0.0',
      description: 'API documentation for FarmTrack application',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://cscloud7-138.lnu.se' 
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 