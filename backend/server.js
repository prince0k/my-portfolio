require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL || 'https://your-frontend-domain.com']
    : ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route - doesn't require database connection
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Database connection status route
app.get('/api/status', async (req, res) => {
  try {
    const { connection } = require('mongoose');
    const status = {
      connected: connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][connection.readyState],
      host: connection.host,
      database: connection.db?.databaseName,
      port: process.env.PORT
    };
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import routes
const messageRoutes = require('./routes/messages');
const postRoutes = require('./routes/posts');

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server and connect to database
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  
  try {
    // Start server first
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log('CORS enabled for origins:', corsOptions.origin);
    });

    // Then try to connect to database
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Failed to start server or connect to database:', error);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:');
  console.error('Reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:');
  console.error(error);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});