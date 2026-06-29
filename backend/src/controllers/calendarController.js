const Booking = require("../models/Booking");
const WeddingBooking = require("../models/WeddingBooking");

exports.getCalendarAvailability = async (req, res) => {
  try {

    // Fetch all active villa bookings
    const villaBookings = await Booking.find({
      status: { $ne: "Cancelled" }
    });

    // Fetch all active wedding bookings
    const weddingBookings = await WeddingBooking.find({
      status: { $ne: "Cancelled" }
    });

    const calendar = [];

    // ============================
    // Wedding Bookings
    // ============================
    weddingBookings.forEach((booking) => {

      let currentDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);

      while (currentDate <= endDate) {

        calendar.push({
          date: currentDate.toISOString().split("T")[0],
          type: "Wedding",
          status:
            booking.status === "Pending"
              ? "Tentative"
              : "Booked",
        });

        currentDate.setDate(currentDate.getDate() + 1);

      }

    });

    // ============================
    // Villa Bookings
    // ============================
    villaBookings.forEach((booking) => {

      let currentDate = new Date(booking.checkInDate);
      const endDate = new Date(booking.checkOutDate);

      while (currentDate <= endDate) {

        calendar.push({
          date: currentDate.toISOString().split("T")[0],
          type: "Villa",
          villasBooked: booking.villaCount,
          status:
            booking.status === "Pending"
              ? "Tentative"
              : "Booked",
        });

        currentDate.setDate(currentDate.getDate() + 1);

      }

    });

    return res.status(200).json({
      success: true,
      calendar,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch calendar availability.",
    });

  }
};