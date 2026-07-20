const mongoose = require("mongoose");

const weddingBookingSchema = new mongoose.Schema(

  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim:true,
    },

    email: {
      type: String,
      required: true,
      trim:true,
      lowercase:true,
    },

    startDate: {
       type: Date,
       required: true,

    },

    endDate: {

      type: Date,
      required: true,

    },


    swimmingPool: {

      type: Boolean,
      default: false,

    },


    generator: {

      type: Boolean, 
      default: false,

    },

    estimatedAmount: {

      type: Number,
      required: true,
      min:0,

    },

    status: {

      type: String,

      enum: [

        "Pending",

        "Confirmed",

        "Cancelled",

        "Completed",

      ],

      default: "Pending",

    },

  },

  {

    timestamps: true,

  }

);

module.exports = mongoose.model(

  "WeddingBooking",

  weddingBookingSchema

);