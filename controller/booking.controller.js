const { Booking } = require("../models/booking.model");

exports.newBooking = async (req, res) => {
  const { user, flight } = req.body;
  if (!user || !flight) {
    return res.status(400).json({ message: "Bad request" });
  } else {
    try {
      const newBooking = new Booking({ user, flight });
      newBooking.save((err, data) => {
        if (err)
          return res
            .status(400)
            .json({ message: "Something went wrong", error: err.message });
        return res
          .status(201)
          .json({ message: "Booking Successfully Done", data });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};
