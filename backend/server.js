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
// Import default villa model for seeding
const Villa = require("./src/models/Villa");

// Get server port from environment variables or use default 5000
const PORT = process.env.PORT || 5000;

const ensureDefaultVilla = async () => {
  const count = await Villa.countDocuments();

  if (count === 0) {
    await Villa.create({
      name: "Sorath Villa",
      description: "Luxury villa with private pool, garden, and premium resort amenities.",
      price: 12000,
      capacity: 8,
      totalUnits: 8,
    });

    console.log("Default Sorath Villa created.");
  }
};

/**
 * Start Server
 * Connect to MongoDB first, then start Express server
 * This ensures database is ready before accepting requests
 */
connectDB()
  .then(async () => {
    await ensureDefaultVilla();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });