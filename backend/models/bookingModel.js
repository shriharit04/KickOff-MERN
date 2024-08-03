// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  turfId: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Booked' },
});

module.exports = mongoose.model('Booking', bookingSchema);
