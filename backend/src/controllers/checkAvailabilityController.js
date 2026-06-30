const Booking = require("../models/Booking");
const WeddingBooking = require("../models/WeddingBooking");

exports.checkAvailability = async (req, res) => {
  try {
    const { type, date } = req.query;

    // Validation
    if (!type || !date) {
      return res.status(400).json({
        success: false,
        message: "Booking type and date are required.",
      });
    }

    // Convert selected date
    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
       success: false,
       message: "Invalid date format.",
    });
}

    // ==========================================
    // VILLA AVAILABILITY
    // ==========================================
    if (type === "villa") {

      const bookings = await Booking.find({
        status: { $ne: "Cancelled" },
        checkInDate: { $lte: selectedDate },
        checkOutDate: { $gte: selectedDate },
      });

      let bookedVillas = 0;

      bookings.forEach((booking) => {
        bookedVillas += booking.villaCount;
      });

      const TOTAL_VILLAS = 40;

      return res.status(200).json({
        success: true,
        type: "villa",
        totalVillas: TOTAL_VILLAS,
        bookedVillas,
        availableVillas: TOTAL_VILLAS - bookedVillas,
        available: bookedVillas < TOTAL_VILLAS,
      });
    }

    // ==========================================
    // WEDDING AVAILABILITY
    // ==========================================
    if (type === "wedding") {

      const booking = await WeddingBooking.findOne({
        status: { $ne: "Cancelled" },
        startDate: { $lte: selectedDate },
        endDate: { $gte: selectedDate },
      });

      return res.status(200).json({
        success: true,
        type: "wedding",
        available: !booking,
        status: booking ? booking.status : "Available",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid booking type.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};