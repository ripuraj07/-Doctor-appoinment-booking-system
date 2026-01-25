require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to MongoDB
connectDB();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (if needed for frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

/**
 * API Routes
 */

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hospital Appointment Booking System API',
    version: '1.0.0',
    status: 'Active',
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Appointment routes (Patient)
app.use('/api/appointments', appointmentRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

/**
 * Error Handling Middleware
 */

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║ Hospital Appointment System - Backend   ║
  ║ Server running on port ${PORT}           ║
  ║ Environment: ${process.env.NODE_ENV || 'development'}     ║
  ╚════════════════════════════════════════╝
  `);
});
