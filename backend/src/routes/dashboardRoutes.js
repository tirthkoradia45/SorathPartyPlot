const express = require("express");

const router = express.Router();

// Import Dashboard Controller
const {
  getDashboardData,
} = require("../controllers/dashboardController");

// ==========================================
// Dashboard Route
// GET /api/admin/dashboard
// ==========================================

router.get("/", getDashboardData);

module.exports = router;