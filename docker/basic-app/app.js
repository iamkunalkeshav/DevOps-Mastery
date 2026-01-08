// DevOps Docker App - Express.js Server
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Application is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Home route
app.get('/', (req, res) => {
  res.json({
    app: 'DevOps Docker App',
    version: '1.0.0',
    author: 'Kunal Keshav',
    message: 'Welcome to the Docker containerized Node.js Express application',
    endpoints: {
      health: '/health',
      api: '/api/status',
      info: '/info'
    }
  });
});

// API Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    environment: process.env.NODE_ENV || 'development',
    platform: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage()
  });
});

// Info endpoint
app.get('/info', (req, res) => {
  res.json({
    appName: 'DevOps Docker App',
    description: 'A simple Node.js Express application for Docker containerization',
    features: [
      'Health checks',
      'Status monitoring',
      'Docker ready',
      'Environment variable support'
    ],
    docker: {
      containerized: true,
      recommended: 'docker run -p 3000:3000 devops-docker-app'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: ['/', '/health', '/api/status', '/info']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n❏ٍ Application started on port ${PORT}`);
  console.log(`💫 Server is running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`👇 Visit http://localhost:${PORT} to access the application\n`);
});

module.exports = app;
