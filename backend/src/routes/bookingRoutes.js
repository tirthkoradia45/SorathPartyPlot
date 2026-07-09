const express = require("express");

const router = express.Router();

const { verifyAdmin } = require("../middleware/authMiddle");
const {
    getAllBookings,
    createBooking,
    checkAvailability,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

router.get("/", verifyAdmin, getAllBookings);

router.get("/availability", checkAvailability);

router.post("/", createBooking);

router.get("/", verifyAdmin, getAllBookings);

router.delete("/:id", verifyAdmin, deleteBooking);

module.exports = router;