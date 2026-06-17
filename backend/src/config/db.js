const mongoose = require('mongoose');

/**
 * Connect to MongoDB using Mongoose.
 * Includes connection event listeners for monitoring.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected.');
    });
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.error('The server will continue running but database features will not work.');
  }
};

module.exports = connectDB;
