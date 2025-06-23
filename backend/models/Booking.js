// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  cnic: String,
  number: String,
  address: String,
  startDate: String,
  endDate: String,
  days: Number,
  totalBill: Number,
  userEmail: String,
  paymentStatus: String,
  car: {
  name: String,
  model: String,
  rentPerDay: Number,
  images: [String],
  fuelAverage: String,
  ac: String,
}

});

module.exports = mongoose.model("Booking", bookingSchema);
