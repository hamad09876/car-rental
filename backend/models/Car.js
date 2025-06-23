const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  model: String,
  rentPerDay: Number,
  images: [String],
  fuelAverage: String,
  ac: String,
});

module.exports = mongoose.model('Car', carSchema);