const express = require("express");
const router = express.Router();
const {
    getAllWeddingBookings,
    createWeddingBooking,
    updateWeddingStatus,
    deleteWeddingBooking
} = require("../controllers/weddingBookingController");


// ROUTES
/** GET ALL WEDDING BOOKINGS
 * GET /api/wedding-bookings
 **/
router.get(

  "/",

  getAllWeddingBookings

);

/**
 CREATE NEW WEDDING BOOKING
  * API:
 * POST /api/wedding-bookings
 */

router.post(

  "/",

  createWeddingBooking

);
// Update Status

router.patch(

  "/:id",

  updateWeddingStatus

);

// Delete Booking

router.delete(

  "/:id",

  deleteWeddingBooking

);

// EXPORT ROUTER

module.exports = router;