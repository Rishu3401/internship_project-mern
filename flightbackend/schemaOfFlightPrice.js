const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema(
  {
    airline: String,
    source: String,
    destination: String,
    date:String,
    price: Number
    
  },
  {
    collection: "flightdetail",
  }
);

mongoose.model("flightdetail", airlineSchema);

