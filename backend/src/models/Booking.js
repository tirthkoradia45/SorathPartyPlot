const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    // Customer Name
    customerName: {
        type: String,
        required: true
    },

    // Customer Phone
    phone: {
        type: String,
        required: true
    },

    // Customer Email
    email: {
        type: String
    },

    // Selected Villa
    villaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Villa",
        required: true
    },

    // Number Of Villas Requested
    villaCount: {
        type: Number,
        required: true,
        default: 1
    },

    // Check In Date
    checkInDate: {
        type: Date,
        required: true
    },

    // Check Out Date
    checkOutDate: {
        type: Date,
        required: true
    },

    // Booking Status
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);