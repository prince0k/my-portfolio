require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const messageRoutes = require('./routes/messages');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/posts', postRoutes);

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server and connect to database
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Status: http://localhost:${PORT}/api/status`);
      console.log('CORS enabled for origins:', ['http://localhost:3001', 'http://localhost:3000']);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
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
  process.exit(1);
});