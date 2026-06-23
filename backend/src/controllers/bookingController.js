const Booking = require("../models/Booking");

// ===============================
// GET ALL BOOKINGS
// ===============================
const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("villaId");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// CREATE NEW BOOKING
// ===============================
const createBooking = async (req, res) => {

    try {

        const booking = await Booking.create(req.body);

        res.status(201).json(booking);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Export Controllers
module.exports = {
    getAllBookings,
    createBooking
};