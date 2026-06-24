const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Villa = require("../models/Villa");

// Controller: Return all booking records with villa details populated.
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("villaId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Controller: Create a new booking if the selected villa is available.
const createBooking = async (req, res) => {
  try {
    // Extract booking data from request body.
    const {
      customerName,
      phone,
      email,
      villaId,
      villaCount,
      checkInDate,
      checkOutDate,
    } = req.body;

    // Find existing bookings that overlap the requested villa and dates.
    const overlappingBookings = await Booking.find({
      villaId,
      checkInDate: {
        $lt: checkOutDate,
      },
      checkOutDate: {
        $gt: checkInDate,
      },
    });

    // Count how many villas are already booked for those dates.
    let bookedVillas = 0;
    overlappingBookings.forEach((booking) => {
      bookedVillas += booking.villaCount;
    });

    // Load villa details from database to verify the selection.
    const villa = await Villa.findById(villaId);
    if (!villa) {
      return res.status(404).json({
        message: "Villa not found",
      });
    }

    // Calculate how many villas remain available.
    const availableVillas = villa.totalUnits - bookedVillas;
    if (villaCount > availableVillas) {
      return res.status(400).json({
        message: `Only ${availableVillas} villas available for selected dates`,
      });
    }

    // Create the booking record in MongoDB.
    const booking = await Booking.create({
      customerName,
      phone,
      email,
      villaId,
      villaCount,
      checkInDate,
      checkOutDate,
    });

    res.status(201).json({
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Controller: Check villa availability for the selected date range.
// This does not create a booking, it only returns counts.
const checkAvailability = async (req, res) => {
  try {
    const { villaId, checkInDate, checkOutDate } = req.query;

    // Find bookings that overlap the requested period
    const overlappingBookings = await Booking.find({
      villaId,
      checkInDate: {
        $lt: checkOutDate,
      },
      checkOutDate: {
        $gt: checkInDate,
      },
    });

    // Add up all booked villas in the overlapping bookings
    let bookedVillas = 0;
    overlappingBookings.forEach((booking) => {
      bookedVillas += booking.villaCount;
    });

    // Load the villa to calculate availability
    const villa = await Villa.findById(villaId);
    if (!villa) {
      return res.status(404).json({
        message: "Villa not found",
      });
    }

    const availableVillas = villa.totalUnits - bookedVillas;
    res.status(200).json({
      totalVillas: villa.totalUnits,
      bookedVillas,
      availableVillas,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Export Controllers
module.exports = {
    getAllBookings,
    createBooking,
    checkAvailability
};