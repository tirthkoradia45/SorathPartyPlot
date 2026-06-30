const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Import route handlers
const villaRoutes = require("./routes/villaRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const weddingBookingRoutes = require("./routes/weddingBookingRoutes");
const checkAvailabilityRoutes = require("./routes/checkAvailabilityRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

/**
 * Test Route
 */
app.get("/", (req, res) => {
  res.send("Sorath Resort API Running");
});

/**
 * Routes
 */
app.use("/api/villas", villaRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wedding-bookings", weddingBookingRoutes);
app.use("/api/check-availability", checkAvailabilityRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin", adminAuthRoutes);

module.exports = app;