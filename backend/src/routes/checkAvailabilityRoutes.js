const express = require("express");

const router = express.Router();

const {
    checkAvailability,
} = require("../controllers/checkAvailabilityController");

// GET /api/check-availability
router.get("/", checkAvailability);

module.exports = router;