const mongoose = require('mongoose');

// Store the last connection error globally
global.lastMongoError = "No connection attempt made yet";

/**
 * Connect to MongoDB using Mongoose.
 * Includes connection event listeners for monitoring.
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing or undefined!");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    global.lastMongoError = null;

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
      global.lastMongoError = err.message;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected.');
    });
  } catch (error) {
    global.lastMongoError = error.message;
    console.error(`MongoDB connection failed: ${error.message}`);
    console.error('The server will continue running but database features will not work.');
  }
};

module.exports = connectDB;
