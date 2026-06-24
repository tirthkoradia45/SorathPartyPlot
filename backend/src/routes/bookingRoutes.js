const express = require("express");

const router = express.Router();

// Import Controllers
const {
    getAllBookings,
    createBooking,
    checkAvailability
} = require("../controllers/bookingController");

// GET ALL BOOKINGS
router.get("/", getAllBookings);

router.get("/availability", checkAvailability);
// CREATE BOOKING
router.post("/", createBooking);

module.exports = router;