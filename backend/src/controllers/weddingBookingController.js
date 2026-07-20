const mongoose = require("mongoose");
const WeddingBooking = require("../models/WeddingBooking");

// GET ALL WEDDING BOOKINGS

const getAllWeddingBookings = async (req, res) => {

    try {

        const bookings = await WeddingBooking.find().lean();

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


// CREATE WEDDING BOOKING
const createWeddingBooking = async (req, res) => {

    try {

        const {

            customerName,
            phone,
            email,
            startDate,
            endDate,
            swimmingPool,
            generator,
            estimatedAmount,
            status

        } = req.body;
        // Required fields
    if (
    !customerName ||
    !phone ||
    !email ||
    !startDate ||
    !endDate
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

// Date validation
if (
    new Date(endDate) <=
    new Date(startDate)
) {

    return res.status(400).json({

        success: false,

        message: "End date must be after the start date."

    });

}

// Past date validation
const today = new Date();
today.setHours(0, 0, 0, 0);

if (new Date(startDate) < today) {

    return res.status(400).json({

        success: false,

        message: "Start date cannot be in the past."

    });

}
const existingBooking = await WeddingBooking.findOne({

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

if (existingBooking) {

    return res.status(400).json({

        success: false,

        message:
            "The party plot is already booked for the selected dates."

    });

}

        const booking = await WeddingBooking.create({

            customerName: customerName.trim(),

            phone: phone.trim(),

            email: email.trim().toLowerCase(),

            startDate,

            endDate,

            swimmingPool,

            generator,

            estimatedAmount: Number(estimatedAmount),

            status

        });

        return res.status(201).json({

            success: true,

            message: "Wedding booking created successfully.",

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

// UPDATE STATUS


const updateWeddingStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        // Validate Booking ID
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid booking ID."

            });

        }

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
        const booking = await WeddingBooking.findById(id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Wedding booking not found."

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

        return res.status(200).json({

            success: true,

            message: "Wedding booking status updated successfully.",

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

// DELETE WEDDING BOOKING
const deleteWeddingBooking = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate Booking ID
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid booking ID."

            });

        }

        const booking = await WeddingBooking.findByIdAndDelete(id);

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Wedding booking not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Wedding booking deleted successfully."

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

    getAllWeddingBookings,

    createWeddingBooking,

    updateWeddingStatus,

    deleteWeddingBooking

};