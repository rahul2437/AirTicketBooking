const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { flightRouter } = require("./routes/flight.route");
const { bookingRouter } = require("./routes/booking.route");
const { dashboardRouter } = require("./routes/dashboard.route");
require("dotenv").config();

const app = express();
// REQUIRED FOR USING IN OTHER NETWORKS
app.use(
  cors({
    origin: "*",
  })
);
// FOR CONVERTING PAYLOAD TO JSON
app.use(express.json());

// USER ROUTE
app.use("/api", userRouter);
// FLIGHT ROUTE
app.use("/api/flights", flightRouter);
// BOOKING ROUTE
app.use("/api/booking", bookingRouter);
// DASHBOARD
app.use("/api/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO AIR TICKET BOOKING API" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(
      `Server listening on port http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log(error.message);
  }
});
