const WeddingBooking = require("../models/WeddingBooking");

const getAllWeddingBookings = async (req, res) => {
  try {
    const bookings = await WeddingBooking.find().lean();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
      status,
    } = req.body;

    if (!customerName || !phone || !email || !startDate || !endDate || !estimatedAmount) {
      return res.status(400).json({ message: "Missing required wedding booking fields." });
    }

    const booking = await WeddingBooking.create({
      customerName,
      phone,
      email,
      startDate,
      endDate,
      swimmingPool,
      generator,
      estimatedAmount,
      status,
    });

    res.status(201).json({ message: "Wedding booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateWeddingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const booking = await WeddingBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Wedding booking not found." });
    }

    res.status(200).json({ message: "Wedding booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteWeddingBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await WeddingBooking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Wedding booking not found." });
    }

    res.status(200).json({ message: "Wedding booking deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWeddingBookings,
  createWeddingBooking,
  updateWeddingStatus,
  deleteWeddingBooking,
};
