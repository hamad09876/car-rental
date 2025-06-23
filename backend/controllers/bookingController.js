const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

exports.createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  const saved = await booking.save();
  res.json(saved);
};

exports.updateBooking = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};