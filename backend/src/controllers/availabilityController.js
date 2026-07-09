const Booking = require("../models/Booking");
const WeddingBooking = require("../models/WeddingBooking");
const Villa = require("../models/Villa");

// ======================================================
// CHECK AVAILABILITY
// ======================================================

exports.checkAvailability = async (req, res) => {

    try {

        const {

            type,
            date

        } = req.query;
                // ======================================================
        // VILLA AVAILABILITY
        // ======================================================

        if (type === "villa") {

            const villa = await Villa.findOne();

            if (!villa) {

                return res.status(404).json({

                    success: false,

                    message: "Villa not found."

                });

            }

            const selectedDate = new Date(date);

            const bookings = await Booking.find({

                status: {

                    $ne: "Cancelled"

                },

                checkInDate: {

                    $lte: selectedDate

                },

                checkOutDate: {

                    $gte: selectedDate

                }

            });

            let bookedVillas = 0;

            bookings.forEach((booking) => {

                bookedVillas += booking.villaCount;

            });

            const totalVillas = villa.totalUnits;

            const availableVillas =

                totalVillas - bookedVillas;

            return res.status(200).json({

                success: true,

                type: "villa",

                totalVillas,

                bookedVillas,

                availableVillas,

                available: availableVillas > 0

            });

        }
                // ======================================================
        // WEDDING AVAILABILITY
        // ======================================================

        if (type === "wedding") {

            const selectedDate = new Date(date);

            const booking = await WeddingBooking.findOne({

                status: {

                    $ne: "Cancelled"

                },

                startDate: {

                    $lte: selectedDate

                },

                endDate: {

                    $gte: selectedDate

                }

            });

            return res.status(200).json({

                success: true,

                type: "wedding",

                available: !booking,

                status: booking ? booking.status : "Available"

            });

        }

        // ======================================================
        // INVALID BOOKING TYPE
        // ======================================================

        return res.status(400).json({

            success: false,

            message: "Invalid booking type."

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