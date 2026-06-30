const express = require("express");

const router = express.Router();

// Import Dashboard Controller
const {
  getDashboardData,
} = require("../controllers/dashboardController");

const { verifyAdmin } = require("../middleware/authMiddle");

// ==========================================
// Dashboard Route
// GET /api/admin/dashboard
// ==========================================

router.get("/", verifyAdmin, getDashboardData);

module.exports = router;