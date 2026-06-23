// Import Mongoose for MongoDB object modeling
const mongoose = require("mongoose");

/**
 * Villa Schema Definition
 * Defines the structure and validation rules for villa documents in MongoDB
 */
const villaSchema = new mongoose.Schema({

  // Villa type/name (e.g., "Luxury Villa", "Beach Villa")
  name: {
    type: String,
    required: true  // Name is mandatory
  },

  // Description of the villa with amenities and features
  description: {
    type: String
  },

  // Rental price per night in Indian Rupees
  price: {
    type: Number,
    required: true  // Price is mandatory
  },

  // Maximum number of guests the villa can accommodate
  capacity: {
    type: Number,
    required: true  // Capacity is mandatory
  },

  // Total number of villa units available
  totalUnits: {
    type: Number,
    default: 40  // Default to 40 units if not specified
  }

}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

/**
 * Villa Model
 * Creates a Villa model based on the schema
 * Used for database operations (CRUD) on villa documents
 */
module.exports = mongoose.model("Villa", villaSchema);