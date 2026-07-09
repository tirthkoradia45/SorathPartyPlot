const express = require("express");

const router = express.Router();

const {
    checkAvailability,
} = require("../controllers/availabilityController");

const {
    validateAvailability,
} = require("../middleware/availabilityValidation");

// GET /api/check-availability
router.get(
    "/",
    validateAvailability,
    checkAvailability
);

module.exports = router;