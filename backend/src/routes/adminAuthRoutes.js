const express = require("express");

const router = express.Router();

// Import Controller
const {
  loginAdmin,
} = require("../controllers/adminAuthController");

// ==========================================
// Admin Login
// POST /api/admin/login
// ==========================================

router.post("/login", loginAdmin);

module.exports = router;