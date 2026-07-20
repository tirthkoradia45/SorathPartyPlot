const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Villa = require("../models/Villa");
const WeddingBooking = require("../models/WeddingBooking");

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("villaId")
            .sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,

            bookings

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

};

// CREATE BOOKING
const createBooking = async (req, res) => {

    try {

        const {

            customerName,
            phone,
            email,
            villaId,
            villaCount,
            checkInDate,
            checkOutDate

        } = req.body;
        // Required field validation
if (
    !customerName ||
    !phone ||
    !email ||
    !villaId ||
    !checkInDate ||
    !checkOutDate
) {
    return res.status(400).json({
        success: false,
        message: "All fields are required."
    });
}

// Name validation
const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

if (!nameRegex.test(customerName.trim())) {
    return res.status(400).json({
        success: false,
        message: "Invalid customer name."
    });
}

// Phone validation
const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(phone.trim())) {
    return res.status(400).json({
        success: false,
        message: "Invalid phone number."
    });
}

// Email validation
const emailRegex =
/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

if (!emailRegex.test(email.trim().toLowerCase())) {
    return res.status(400).json({
        success: false,
        message: "Invalid email address."
    });
}

// Villa count validation
if (
    !Number.isInteger(Number(villaCount)) ||
    Number(villaCount) < 1
) {
    return res.status(400).json({
        success: false,
        message: "Villa count must be at least 1."
    });
}

// Date validation
if (
    new Date(checkOutDate) <=
    new Date(checkInDate)
) {
    return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date."
    });
}
const today = new Date();
today.setHours(0, 0, 0, 0);

if (new Date(checkInDate) <= today) {
    return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past."
    });
}
if (!mongoose.Types.ObjectId.isValid(villaId)) {
    return res.status(400).json({
        success: false,
        message: "Invalid villa selected."
    });
}

        // Check if a wedding is already booked

        const weddingExists = await WeddingBooking.findOne({

            status: {

                $ne: "Cancelled"

            },

            startDate: {

                $lt: checkOutDate

            },

            endDate: {

                $gt: checkInDate

            }

        });

        if (weddingExists) {

            return res.status(400).json({

                success: false,

                message:
                    "No Villas Available. All villas are reserved for a Wedding during the selected dates."

            });

        }

        // Fetch Villa

        const villa = await Villa.findById(villaId);

        if (!villa) {

            return res.status(404).json({

                success: false,

                message: "Villa not found."

            });

        }

        // Find overlapping bookings

        const overlappingBookings = await Booking.find({

            villaId,

            checkInDate: {

                $lt: checkOutDate

            },

            checkOutDate: {

                $gt: checkInDate

            },

            status: {

                $ne: "Cancelled"

            }

        });

        let bookedVillas = 0;

        overlappingBookings.forEach((booking) => {

            bookedVillas += booking.villaCount;

        });

        const availableVillas =

            villa.totalUnits - bookedVillas;

        // Prevent overbooking

        if (Number(villaCount) > availableVillas) {

            return res.status(400).json({

                success: false,

                message: `Only ${availableVillas} villas available for the selected dates.`

            });

        }

        // Create booking

        const booking = await Booking.create({

            customerName: customerName.trim(),

            phone: phone.trim(),

            email: email.toLowerCase().trim(),

            villaId,

            villaCount: Number(villaCount),

            checkInDate,

            checkOutDate

        });

        return res.status(201).json({

            success: true,

            message: "Booking created successfully.",

            booking

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

};


// CHECK AVAILABILITY
const checkAvailability = async (req, res) => {

    try {

        const {

            villaId,
            checkInDate,
            checkOutDate

        } = req.query;
        if (
    !villaId ||
    !checkInDate ||
    !checkOutDate
) {
    return res.status(400).json({
        success: false,
        message: "Missing required fields."
    });
}

if (!mongoose.Types.ObjectId.isValid(villaId)) {
    return res.status(400).json({
        success: false,
        message: "Invalid villa selected."
    });
}

if (
    new Date(checkOutDate) <=
    new Date(checkInDate)
) {
    return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date."
    });
}
        const villa = await Villa.findById(villaId);

        if (!villa) {

            return res.status(404).json({

                success: false,

                message: "Villa not found."

            });

        }

        const weddingExists = await WeddingBooking.findOne({

            status: {

                $ne: "Cancelled"

            },

            startDate: {

                $lt: checkOutDate

            },

            endDate: {

                $gt: checkInDate

            }

        });

        if (weddingExists) {

            return res.status(200).json({

                success: true,

                totalVillas: villa.totalUnits,

                bookedVillas: villa.totalUnits,

                availableVillas: 0,

                message:
                    "All villas are reserved for a wedding."

            });

        }

        const overlappingBookings = await Booking.find({

            villaId,

            checkInDate: {

                $lt: checkOutDate

            },

            checkOutDate: {

                $gt: checkInDate

            },

            status: {

                $ne: "Cancelled"

            }

        });

        let bookedVillas = 0;

        overlappingBookings.forEach((booking) => {

            bookedVillas += booking.villaCount;

        });

        const availableVillas =

            villa.totalUnits - bookedVillas;

        return res.status(200).json({

            success: true,

            totalVillas: villa.totalUnits,

            bookedVillas,

            availableVillas

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

};

// UPDATE BOOKING STATUS
const updateBookingStatus = async (req, res) => {

    try {

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
        success: false,
        message: "Invalid booking ID."
    });

}
        const { status } = req.body;

        const allowedStatus = [

            "Pending",
            "Confirmed",
            "Cancelled",
            "Completed"

        ];

        if (!allowedStatus.includes(status)) {

            return res.status(400).json({

                success: false,

                message: "Invalid booking status."

            });

        }

        // Fetch booking
        const booking = await Booking.findById(id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found."

            });

        }

        // Allowed status transitions
        const validTransitions = {

            Pending: ["Confirmed", "Cancelled"],

            Confirmed: ["Completed", "Cancelled"],

            Completed: [],

            Cancelled: []

        };

        if (!validTransitions[booking.status].includes(status)) {

            return res.status(400).json({

                success: false,

                message: `Cannot change booking from ${booking.status} to ${status}.`

            });

        }

        booking.status = status;

        await booking.save();

        await booking.populate("villaId");

        return res.status(200).json({

            success: true,

            message: "Booking status updated successfully.",

            booking

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

};

// DELETE BOOKING
const deleteBooking = async (req, res) => {

    try {

        const { id } = req.params;

        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Booking deleted successfully."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

};

module.exports = {

    getAllBookings,

    createBooking,

    checkAvailability,

    updateBookingStatus,

    deleteBooking

};