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

    if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
      console.warn(
        "MONGO_URI is not configured. Starting without a MongoDB connection. Update backend/.env to enable database features."
      );
      return;
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }

    console.warn(
      "Continuing without database connection so the server can still start in development."
    );
  }
};

// Export database connection function for use in server.js
module.exports = connectDB;