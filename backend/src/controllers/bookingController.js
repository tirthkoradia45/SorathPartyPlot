const Booking = require("../models/Booking");
const Villa = require("../models/Villa");
const WeddingBooking = require("../models/WeddingBooking");

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("villaId");

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

            phone,

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

        const booking = await Booking.findByIdAndUpdate(

            id,

            {

                status

            },

            {

                new: true,

                runValidators: true

            }

        ).populate("villaId");

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found."

            });

        }

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