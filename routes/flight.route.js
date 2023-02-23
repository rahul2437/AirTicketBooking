const express = require("express");
const {
  getAllAvailableFlights,
  getSpecificFlightByID,
  addNewFlight,
  updateSpecificFlight,
  deleteById,
} = require("../controller/flight.controller");

const flightRouter = express.Router();

flightRouter.get("/", getAllAvailableFlights);
flightRouter.get("/:id", getSpecificFlightByID);
flightRouter.post("/", addNewFlight);
flightRouter.put("/:id", updateSpecificFlight);
flightRouter.patch("/:id", updateSpecificFlight);
flightRouter.delete("/:id", deleteById);

module.exports = { flightRouter };
