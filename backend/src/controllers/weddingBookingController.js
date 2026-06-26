const WeddingBooking = require("../models/WeddingBooking");

// GET ALL WEDDING BOOKINGS
// API:
// GET /api/wedding-bookings
// Returns all wedding bookings from MongoDB.
const getAllWeddingBookings = async (req, res) => {

  try {

    const bookings = await WeddingBooking.find();

    res.status(200).json(bookings);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

// CREATE WEDDING BOOKING
// API:
// POST /api/wedding-bookings

// Before creating the booking:
// 1. Check overlapping bookings
// 2. Reject if party plot already booked
// 3. Save booking


const createWeddingBooking = async (req, res) => {

  try {

    // Extract data from frontend
    const {

      customerName,

      phone,

      email,

      startDate,

      endDate,

      swimmingPool,

      generator,

      estimatedAmount

    } = req.body;

    // Find overlapping wedding bookings
    const overlappingBookings = await WeddingBooking.find({

      status: {

        $ne: "Cancelled"

      },

      startDate: {

        $lt: endDate

      },

      endDate: {

        $gt: startDate

      }

    });

    // If booking exists
    // Reject request

    if (overlappingBookings.length > 0) {

      return res.status(400).json({

        message:
          "Party Plot is already booked for the selected dates."

      });

    }

    // Create Booking
    const booking = await WeddingBooking.create({

      customerName,

      phone,

      email,

      startDate,

      endDate,

      swimmingPool,

      generator,

      estimatedAmount

    });

    res.status(201).json({

      message: "Wedding Booking Created Successfully",

      booking

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
// UPDATE WEDDING BOOKING STATUS
// API
// PATCH /api/wedding-bookings/:id
//
// Allows Admin to:
//
// Pending
// ↓
// Confirmed
//
// OR
//
// Pending
// ↓
// Cancelled
const updateWeddingStatus = async (req, res) => {

  try {

    const booking = await WeddingBooking.findByIdAndUpdate(

      req.params.id,

      {

        status: req.body.status

      },

      {

        new: true

      }

    );

    if (!booking) {

      return res.status(404).json({

        message: "Wedding Booking Not Found"

      });

    }

    res.status(200).json({

      message: "Wedding Booking Updated Successfully",

      booking

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
// DELETE WEDDING BOOKING
// API
// DELETE /api/wedding-bookings/:id
const deleteWeddingBooking = async (req, res) => {

  try {

    const booking = await WeddingBooking.findByIdAndDelete(

      req.params.id

    );

    if (!booking) {

      return res.status(404).json({

        message: "Wedding Booking Not Found"

      });

    }

    res.status(200).json({

      message: "Wedding Booking Deleted Successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
// EXPORT CONTROLLERS
module.exports = {

  getAllWeddingBookings,
  createWeddingBooking,
  updateWeddingStatus,
  deleteWeddingBooking 

};