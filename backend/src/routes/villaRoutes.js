// Import Express framework
const express = require("express");

// Create a new router instance for villa routes
const router = express.Router();

// Import villa controller functions
const {
  getAllVillas
} = require("../controllers/villaController");

/**
 * GET /api/villas
 * Retrieve all available villas from database
 * Returns array of villa objects with details (name, price, capacity, etc)
 */
router.get("/", getAllVillas);

// Export router so it can be used in app.js
module.exports = router;