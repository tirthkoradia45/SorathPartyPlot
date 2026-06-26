const express = require("express");

const router = express.Router();

// Import Controllers
const {
    getAllBookings,
    createBooking,
    checkAvailability,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

// GET ALL BOOKINGS
router.get("/", getAllBookings);

// CHECK AVAILABILITY

router.get("/availability", checkAvailability);

// CREATE BOOKING
router.post("/", createBooking);

// UPDATE BOOKING STATUS

router.patch("/:id", updateBookingStatus);

// DELETE BOOKING
router.delete("/:id", deleteBooking);

module.exports = router;