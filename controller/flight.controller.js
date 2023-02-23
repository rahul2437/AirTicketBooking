const { Flight } = require("../models/flight.model");

// GET ALL FLIGHTS
exports.getAllAvailableFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    return res.status(200).json({ total: flights.length, flights });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", err: err.message });
  }
};

// GET SPECIFIC FLIGHT BY ID
exports.getSpecificFlightByID = async (req, res) => {
  const _id = req.params.id;
  try {
    const flight = await Flight.findById(_id);
    return res.status(200).json({ flight });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
// ADD new flight to the System
exports.addNewFlight = async (req, res) => {
  const {
    airline,
    flightNo,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;
  if (
    !airline ||
    !flightNo ||
    !departure ||
    !arrival ||
    !departureTime ||
    !arrivalTime ||
    !seats ||
    !price
  ) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    let flight = await Flight.findOne({ flightNo });
    if (flight) {
      return res.status(500).json({ message: "Flight already in System" });
    } else {
      const newflight = new Flight({
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      });
      newflight.save((err, data) => {
        if (err)
          return res
            .status(400)
            .json({ message: "Something went wrong", error: err.message });
        return res
          .status(201)
          .json({ message: "Flight Successfully added in System", data });
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
// EDIT The Details of Flight from System
exports.updateSpecificFlight = async (req, res) => {
  const _id = req.params.id;
  if (!req.body) {
    return res.status(400).json({ message: "Bad Request" });
  }
  try {
    const body = req.body;
    const updatefields = {};
    for (let b in body) {
      updatefields[b] = body[b];
    }
    Flight.findByIdAndUpdate(_id, updatefields, function (err, data) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Something went wrong", error: err.message });
      }
      return res.status(204).json({ message: "Updated successfully", data });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
// Delete a specific flight identified by its ID
exports.deleteById = async (req, res) => {
  const _id = req.params.id;
  try {
    Flight.findByIdAndDelete(_id, function (err, data) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Something went wrong", error: err.message });
      }
      return res.status(202).json({ message: "Flight deleted successfully" });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
