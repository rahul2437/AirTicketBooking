const express = require("express");
const { newBooking } = require("../controller/booking.controller");
const { getAllBooking } = require("../controller/dashboard.controller");

const dashboardRouter = express.Router();

dashboardRouter.get("/", getAllBooking);

module.exports = { dashboardRouter };
