const { Booking } = require("../models/booking.model");

exports.getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user flight");
    return res.status(200).json({ bookings });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
