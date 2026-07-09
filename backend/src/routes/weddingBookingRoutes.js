const express = require("express");
const router = express.Router();

const { verifyAdmin } = require("../middleware/authMiddle");

const {
  getAllWeddingBookings,
  createWeddingBooking,
  updateWeddingStatus,
  deleteWeddingBooking,
} = require("../controllers/weddingBookingController");

router.get("/", verifyAdmin, getAllWeddingBookings);

router.post("/", createWeddingBooking);

router.patch("/:id", verifyAdmin, updateWeddingStatus);

router.delete("/:id", verifyAdmin, deleteWeddingBooking);

module.exports = router;