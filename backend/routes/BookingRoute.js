// routes->booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const Turf = require('../models/turfModel');
const authMiddleware = require('../middleware/authMiddleware');

// Create Booking
router.post('/new', authMiddleware, async (req, res) => {
  const { turfId, startTime, endTime, amount } = req.body;
  const userId = req.user._id;  // Get the userId from the decoded JWT token

  try {
    // Validate and check availability logic
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(400).send('Turf not found');
    }

    // Check if turf is available
    const existingBookings = await Booking.find({
      turfId,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(400).send('Turf not available at the selected time');
    }

    // Calculate duration in minutes
    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60);

    // Create booking
    const booking = new Booking({ userId, turfId, startTime, endTime, duration, amount });
    await booking.save();

    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.get('/unavailableSlots', async (req, res) => {
    const { turfId, date } = req.query;
    
    try {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 1);
  
      const bookings = await Booking.find({
        turfId,
        startTime: { $gte: startDate, $lt: endDate }
      });
  
      const unavailableSlots = bookings.map(booking => ({
        start: new Date(booking.startTime).getHours() * 2 + new Date(booking.startTime).getMinutes() / 30,
        end: new Date(booking.endTime).getHours() * 2 + new Date(booking.endTime).getMinutes() / 30
      }));
  
      res.json(unavailableSlots);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

module.exports = router;
