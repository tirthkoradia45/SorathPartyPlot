const express = require("express");
const router = express.Router();

const { verifyAdmin } = require("../middleware/authMiddle");
const {
    validateWeddingBooking
} = require("../middleware/weddingBookingValidation");

const {
    getAllWeddingBookings,
    createWeddingBooking,
    updateWeddingStatus,
    deleteWeddingBooking
} = require("../controllers/weddingBookingController");


// Public Routes


router.post(
    "/",
    validateWeddingBooking,
    createWeddingBooking
);

// Admin Routes


router.get(
    "/",
    verifyAdmin,
    getAllWeddingBookings
);

router.patch(
    "/:id",
    verifyAdmin,
    updateWeddingStatus
);

router.delete(
    "/:id",
    verifyAdmin,
    deleteWeddingBooking
);

module.exports = router;