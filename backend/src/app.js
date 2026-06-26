
const express = require("express");
// Import CORS middleware for cross-origin requests
const cors = require("cors");

const app = express();

// Middleware: Parse incoming JSON requests
app.use(express.json());
// Middleware: Enable CORS to allow requests from frontend
app.use(cors());

// Import route handlers
const villaRoutes = require("./routes/villaRoutes");  // Villa booking routes
const bookingRoutes = require("./routes/bookingRoutes");  // Booking management routes
const weddingBookingRoutes = require("./routes/weddingBookingRoutes"); // Wedding Booking routes

/**
 * Test/Health Check Route
 * Simple endpoint to verify API is running
 * GET http://localhost:5000/
 */
app.get("/", (req, res) => {
  res.send("Sorath Resort API Running");
});

/**
 * Villa Routes
 * All villa-related endpoints
 * GET http://localhost:5000/api/villas - Get all villas
 */
app.use("/api/villas", villaRoutes);

/**
 * Booking Routes
 * All booking management endpoints
 * POST http://localhost:5000/api/bookings - Create new booking
 */
app.use("/api/bookings", bookingRoutes);

app.use("/api/wedding-bookings", weddingBookingRoutes);

// Export app so server.js can use it to start the server
module.exports = app;