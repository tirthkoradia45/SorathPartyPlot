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

        const booking = await WeddingBooking.create({

            customerName: customerName.trim(),

            phone,

            email: email.toLowerCase().trim(),

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

        const booking = await WeddingBooking.findByIdAndUpdate(

            id,

            {

                status

            },

            {

                new: true,

                runValidators: true

            }

        );

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Wedding booking not found."

            });

        }

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