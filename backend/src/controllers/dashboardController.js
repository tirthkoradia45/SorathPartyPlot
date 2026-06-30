const Booking = require("../models/Booking");
const WeddingBooking = require("../models/WeddingBooking");
const Villa = require("../models/Villa");

exports.getDashboardData = async (req, res) => {
  try {

    // ==========================================
    // Fetch Data
    // ==========================================

    const villas = await Villa.find();

    const villaBookings = await Booking.find({
      status: { $ne: "Cancelled" }
    }).sort({ createdAt: -1 });

    const weddingBookings = await WeddingBooking.find({
      status: { $ne: "Cancelled" }
    }).sort({ createdAt: -1 });

    // ==========================================
    // Statistics
    // ==========================================

    const totalVillas = villas.reduce(
      (sum, villa) => sum + villa.totalUnits,
      0
    );

    const bookedVillas = villaBookings.reduce(
      (sum, booking) => sum + booking.villaCount,
      0
    );

    const availableVillas = totalVillas - bookedVillas;

    const totalWeddingBookings = weddingBookings.length;

    const pendingVillaBookings = villaBookings.filter(
      booking => booking.status === "Pending"
    ).length;

    const pendingWeddingBookings = weddingBookings.filter(
      booking => booking.status === "Pending"
    ).length;

    // ==========================================
    // Estimated Revenue
    // ==========================================

    let villaRevenue = 0;

    villaBookings.forEach((booking) => {

      const villa = villas.find(
        v => v._id.toString() === booking.villaId.toString()
      );

      if (villa) {

        villaRevenue += villa.price * booking.villaCount;

      }

    });

    const weddingRevenue = weddingBookings.reduce(
      (sum, booking) => sum + booking.estimatedAmount,
      0
    );

    const totalRevenue = villaRevenue + weddingRevenue;

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({

      success: true,

      statistics: {

        totalVillas,
        bookedVillas,
        availableVillas,

        totalVillaBookings: villaBookings.length,

        totalWeddingBookings,

        pendingBookings:
          pendingVillaBookings +
          pendingWeddingBookings,

        totalRevenue

      },

      recentVillaBookings: villaBookings.slice(0, 5),

      recentWeddingBookings: weddingBookings.slice(0, 5)

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Failed to load dashboard."

    });

  }

};