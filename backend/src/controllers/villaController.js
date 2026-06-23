// Import Villa database model
const Villa = require("../models/Villa");

/**
 * Get All Villas Controller
 * Retrieves all villa records from database
 * Route: GET /api/villas
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} Array of villa objects in JSON format
 */
const getAllVillas = async (req, res) => {

  try {
    // Query database to find all villas
    const villas = await Villa.find();

    // Send successful response with villas data
    res.status(200).json(villas);

  } catch (error) {
    // Handle errors and send error response
    res.status(500).json({
      message: error.message
    });
  }
};

// Export controller functions
module.exports = {
  getAllVillas
};