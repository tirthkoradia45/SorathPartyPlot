// Import mongoose for MongoDB connections and object modeling
const mongoose = require("mongoose");

/**
 * Database Connection Function
 * Connects to MongoDB using connection string from .env
 * 
 * Supports two MongoDB connection types:
 * - Local: mongodb://127.0.0.1:27017/database_name
 * - Atlas Cloud: mongodb+srv://username:password@cluster.mongodb.net/database_name
 * 
 * @async
 * @throws {Error} Exits process if connection fails
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Get MongoDB connection string from environment variables
    const uri = process.env.MONGO_URI;

    // Validate that MONGO_URI is set and has valid format
    if (
      !uri ||
      (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))
    ) {
      throw new Error(
        'Invalid MONGO_URI. Set MONGO_URI in .env to a valid MongoDB connection string starting with "mongodb://" or "mongodb+srv://\".'
      );
    }

    // Establish connection to MongoDB
    await mongoose.connect(uri);
    console.log("MongoDB Connected");

  } catch (error) {
    // Log connection error message
    console.log(error.message);

    // Exit process with error code if connection fails
    process.exit(1);
  }
};

// Export database connection function for use in server.js
module.exports = connectDB;