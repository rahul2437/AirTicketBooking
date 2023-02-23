const express = require("express");
const { newBooking } = require("../controller/booking.controller");

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking);

module.exports = { bookingRouter };
