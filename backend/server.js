/**
 * Sorath Resort Backend Server
 * Main entry point for the Node.js/Express application
 */

// Load environment variables from .env file
require("dotenv").config();

// Import the Express application with all routes and middleware
const app = require("./src/app");

// Import MongoDB database connection function
const connectDB = require("./src/config/db");

// Get server port from environment variables or use default 5000
const PORT = process.env.PORT || 5000;

/**
 * Start Server
 * Connect to MongoDB first, then start Express server
 * This ensures database is ready before accepting requests
 */
connectDB().then(() => {
  // Start Express server on specified port
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});