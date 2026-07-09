const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || process.env.CLIENT_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173").split(",").map((origin) => origin.trim()).filter(Boolean);
app.use(express.json());
app.disable("x-powered-by");
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const isLocalDevelopmentOrigin = /^(http|https):\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
      if (isLocalDevelopmentOrigin) {
        return callback(null, true);
      }

      return callback(
      new Error("CORS policy: Origin not allowed.")
    );
    },
    credentials: true,
  })
);

// Import route handlers
const villaRoutes = require("./routes/villaRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const weddingBookingRoutes = require("./routes/weddingBookingRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
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
app.use("/api/check-availability", availabilityRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin", adminAuthRoutes);

module.exports = app;