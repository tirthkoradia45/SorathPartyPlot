const express = require("express");

const router = express.Router();

// Import Controllers
const {
    getAllBookings,
    createBooking
} = require("../controllers/bookingController");

// GET ALL BOOKINGS
router.get("/", getAllBookings);

// CREATE BOOKING
router.post("/", createBooking);

module.exports = router;