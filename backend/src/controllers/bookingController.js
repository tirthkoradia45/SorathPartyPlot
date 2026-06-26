
const mongoose = require("mongoose");


const Booking = require("../models/Booking");

const Villa = require("../models/Villa");


// ======================================================
// GET ALL BOOKINGS
// ======================================================
// Controller:
// Returns all booking records from MongoDB.
//
// populate("villaId")
// replaces the ObjectId stored in villaId with
// the complete Villa document.
//
// Without populate():
//
// villaId = "68654abf..."
//
// With populate():
//
// villaId = {
//      _id: "...",
//      name: "Sorath Villa",
//      price: 2500,
//      capacity: 4
// }
//
// This allows the frontend to display
// booking.villaId.name instead of only an ObjectId.
// ======================================================

const getAllBookings = async (req, res) => {

    try {

        // Fetch all bookings and populate villa details
        const bookings = await Booking.find()
            .populate("villaId");

        // Send bookings to frontend
        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ======================================================
// CREATE NEW BOOKING
// ======================================================
// This controller performs:
//
// 1. Read booking details
// 2. Find overlapping bookings
// 3. Calculate already booked villas
// 4. Check available villas
// 5. Prevent overbooking
// 6. Create booking
// ======================================================

const createBooking = async (req, res) => {

    try {

        // ----------------------------------
        // Extract data sent by frontend
        // ----------------------------------

        const {

            customerName,
            phone,
            email,
            villaId,
            villaCount,
            checkInDate,
            checkOutDate

        } = req.body;


        // ----------------------------------
        // FIND OVERLAPPING BOOKINGS
        // ----------------------------------
        //
        // Date overlap condition
        //
        // Existing Booking
        // |----------|
        //
        // New Booking
        //      |-----------|
        //
        // They overlap if:
        //
        // existing.checkIn < new.checkOut
        //
        // AND
        //
        // existing.checkOut > new.checkIn
        //
        // ----------------------------------

        const overlappingBookings = await Booking.find({

            villaId,

            checkInDate: {
                $lt: checkOutDate
            },

            checkOutDate: {
                $gt: checkInDate
            }

        });


        // ----------------------------------
        // CALCULATE ALREADY BOOKED VILLAS
        // ----------------------------------

        let bookedVillas = 0;

        overlappingBookings.forEach((booking) => {

            bookedVillas += booking.villaCount;

        });


        // ----------------------------------
        // FETCH SELECTED VILLA
        // ----------------------------------

        const villa = await Villa.findById(villaId);

        if (!villa) {

            return res.status(404).json({

                message: "Villa not found"

            });

        }


        // ----------------------------------
        // CALCULATE AVAILABLE VILLAS
        // ----------------------------------

        const availableVillas =
            villa.totalUnits - bookedVillas;


        // ----------------------------------
        // PREVENT OVERBOOKING
        // ----------------------------------

        if (villaCount > availableVillas) {

            return res.status(400).json({

                message:
                    `Only ${availableVillas} villas available for selected dates`

            });

        }


        // ----------------------------------
        // CREATE BOOKING
        // ----------------------------------

        const booking = await Booking.create({

            customerName,
            phone,
            email,
            villaId,
            villaCount,
            checkInDate,
            checkOutDate

        });


        // ----------------------------------
        // SEND SUCCESS RESPONSE
        // ----------------------------------

        res.status(201).json({

            message: "Booking Created Successfully",

            booking

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ======================================================
// CHECK VILLA AVAILABILITY
// ======================================================
//
// This API does NOT create booking.
//
// It only tells:
//
// Total Villas
//
// Already Booked
//
// Remaining Villas
//
// Used by frontend for live availability.
// ======================================================

const checkAvailability = async (req, res) => {

    try {

        // Read query parameters

        const {

            villaId,
            checkInDate,
            checkOutDate

        } = req.query;


        // ----------------------------------
        // FIND OVERLAPPING BOOKINGS
        // ----------------------------------

        const overlappingBookings = await Booking.find({

            villaId,

            checkInDate: {
                $lt: checkOutDate
            },

            checkOutDate: {
                $gt: checkInDate
            }

        });


        // ----------------------------------
        // CALCULATE BOOKED VILLAS
        // ----------------------------------

        let bookedVillas = 0;

        overlappingBookings.forEach((booking) => {

            bookedVillas += booking.villaCount;

        });


        // ----------------------------------
        // FETCH VILLA
        // ----------------------------------

        const villa = await Villa.findById(villaId);

        if (!villa) {

            return res.status(404).json({

                message: "Villa not found"

            });

        }


        // ----------------------------------
        // CALCULATE REMAINING VILLAS
        // ----------------------------------

        const availableVillas =
            villa.totalUnits - bookedVillas;


        // ----------------------------------
        // SEND RESULT
        // ----------------------------------

        res.status(200).json({

            totalVillas: villa.totalUnits,

            bookedVillas,

            availableVillas

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ======================================================
// UPDATE BOOKING STATUS
// ======================================================
//
// Used by Admin Dashboard.
//
// Example:
//
// Pending
//      ↓
// Confirmed
//
// Pending
//      ↓
// Cancelled
//
// Route:
//
// PATCH /api/bookings/:id
// ======================================================

const updateBookingStatus = async (req, res) => {

    try {

        // Booking ID comes from URL

        const { id } = req.params;

        // New status comes from request body

        const { status } = req.body;


        // Update booking

        const booking = await Booking.findByIdAndUpdate(

            id,

            {
                status
            },

            {
                // Return updated document
                new: true
            }

        ).populate("villaId");


        // Booking not found

        if (!booking) {

            return res.status(404).json({

                message: "Booking not found"

            });

        }


        // Success Response

        res.status(200).json({

            message: "Booking status updated successfully",

            booking

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
const deleteBooking = async (req, res) => {

    try {

        // Booking ID comes from URL
        const bookingId = req.params.id;

        // Delete booking
        const booking = await Booking.findByIdAndDelete(bookingId);

        // If booking not found
        if (!booking) {

            return res.status(404).json({

                message: "Booking not found"

            });

        }

        // Success Response
        res.status(200).json({

            message: "Booking deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

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

