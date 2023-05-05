const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
dotenv.config({ path: './config.env' });

require('./db/conn');
const PORT = process.env.PORT || 5000;

require("./schemaOfFlightPrice");
const FlightDetail = mongoose.model("flightdetail")

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});

app.get("/getflightdetail", async (req, res) => {
  try {

    const allflight = await FlightDetail.find({});
    res.send({ status: "ok", data: allflight });
  } catch (error) {
    console.log(error);
  }
});

app.get('/getflight', async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    const flights = await FlightDetail.find({
      source,
      destination,
      date
    }).select('airline price');

    if (flights.length === 0) {
      res.send({ message: 'No flights available' });
    } else {
      res.send(flights);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});



  



