const express = require("express");
const router = express.Router();

const { verifyAdmin } = require("../middleware/authMiddle");
const { validateBooking } = require("../middleware/bookingValidation");

const {
    validateAvailability
} = require("../middleware/availabilityValidation");

const {
    getAllBookings,
    createBooking,
    checkAvailability,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

// Public Routes

router.post(
    "/",
    validateBooking,
    createBooking
);

router.get(
    "/availability",
    validateAvailability,
    checkAvailability
);

// Admin Routes


router.get(
    "/",
    verifyAdmin,
    getAllBookings
);

router.patch(
    "/:id",
    verifyAdmin,
    updateBookingStatus
);

router.delete(
    "/:id",
    verifyAdmin,
    deleteBooking
);

module.exports = router;