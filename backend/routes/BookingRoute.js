// routes->booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const Turf = require('../models/turfModel');
const authMiddleware = require('../middleware/authMiddleware.js');

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
        start: new Date(booking.startTime).getHours() + new Date(booking.startTime).getMinutes()/60,
        end: new Date(booking.endTime).getHours() + new Date(booking.endTime).getMinutes()/60
      }));  
      res.json(unavailableSlots);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  router.get('/myBookings', authMiddleware, async (req, res) => {
    const userDoc = req.user;
    
    try {
      // Find bookings where the user is the one who booked
      const userBookings = await Booking.find({ userId: userDoc._id });
  
      // Find turf documents where the user is the lister
      const turfs = await Turf.find({ lister_id: userDoc._id });
  
      // Extract turf IDs from the retrieved turfs
      const turfIds = turfs.map(turf => turf._id);
  
      // Find bookings where the user is the lister (by matching turf IDs)
      const listerBookings = await Booking.find({ turfId: { $in: turfIds } });  
      // Send the bookings data with status 200
      res.status(200).json({ userBookings, listerBookings });
    } catch (error) {
      // Send error response with status 500
      res.status(500).json({ message: 'An error occurred while fetching bookings', error });
    }
  });
  
  

  router.put('/updateBookingStatus', authMiddleware, async (req, res) => {
    try {
      const now = new Date();
  
      // Update status for ongoing bookings
      const ongoingResult = await Booking.updateMany(
        { startTime: { $lt: now }, endTime: { $gt: now }, status: 'Booked' },
        { $set: { status: 'Ongoing' } }
      );
  
      // Update status for completed bookings
      const completedResult = await Booking.updateMany(
        { endTime: { $lt: now }, status: { $in: ['Booked', 'Ongoing'] } },
        { $set: { status: 'Completed' } }
      );
  
      res.send('Booking statuses updated');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  



module.exports = router;
