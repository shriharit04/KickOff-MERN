// routes->booking/
const express = require('express');
require('dotenv').config();
const router = express.Router();
const Booking = require('../models/bookingModel');
const Turf = require('../models/turfModel');
const User = require('../models/userModel.js')
const authMiddleware = require('../middleware/authMiddleware.js');
// const resend = new Resend(process.env.RESEND_API_KEY);

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const fs = require('fs');
const path = require('path');

const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const sendBookingMailUser = async (user, turf, booking) => {
  try {

    const templatePath = path.join(__dirname, '..', 'templates', 'bookingConfirmationUser.html');
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    // Read the HTML template
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with dynamic values
    htmlTemplate = htmlTemplate
      .replace('{{name}}', user.name)
      .replace('{{bookingId}}', booking._id)
      .replace('{{turfName}}', turf.name)
      .replace('{{turfPhoneNo}}', turf.contactNo)
      .replace('{{bookingDate}}', formatDate(start))
      .replace('{{startTime}}', formatTime(start))
      .replace('{{endTime}}', formatTime(end));

    // Sending email using Resend
    const { data, error } = await resend.emails.send({
      from: "bookings@kickofftime.in",
      to: user.email,
      subject: "Booking Confirmed!",
      html: htmlTemplate,
    });

    if (error) {
      console.log(error);
      return;
    }

    return { data };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendBookingMailLister = async (user, turf, booking) => {
  try {
    const templatePath = path.join(__dirname, '..', 'templates', 'bookingConfirmationLister.html');
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    // Read the HTML template
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with dynamic values
    htmlTemplate = htmlTemplate
      .replace('{{bookingId}}', booking._id)
      .replace('{{customerName}}', user.name)
      .replace('{{customerEmail}}', user.email)
      .replace('{{turfName}}', turf.name)
      .replace('{{bookingDate}}', formatDate(start))
      .replace('{{startTime}}', formatTime(start))
      .replace('{{endTime}}', formatTime(end));

    // Sending email using Resend
    const { data, error } = await resend.emails.send({
      from: "bookings@kickofftime.in",
      to: turf.contactMail,
      subject: `New Booking on ${formatDate(start)} at slot ${formatTime(start)}-${formatTime(end)} Confirmed!`,
      html: htmlTemplate,
    });

    if (error) {
      console.log(error);
      return error;
    }

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};






// Create Booking
router.post('/new', authMiddleware, async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized. Please log in to continue.' });
  }

  const { turfId, startTime, endTime, amount } = req.body;
  const userId = req.user._id;  // Get the userId from the decoded JWT token

  try {
    // Validate and check availability logic
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(400).json({ error: 'Turf not found' });
    }
    const user = await User.findById(userId);
    if(!userId){
      return res.status(400).json({error:'User not found'})
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
      return res.status(400).json({ error: 'Turf not available at the selected time' });
    }

    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60);

    // Create booking
    const booking = new Booking({ userId, turfId, startTime, endTime, duration, amount });
    await booking.save();

    // userName = req.user.name;
    // userEmail = req.user.email;
    // bookingId = booking._id;
    // turfName = turf.name;
    // turfContact = turf.phoneNo;
    // turfLocation = turf.location

    sendBookingMailUser(user, turf, booking);
    sendBookingMailLister(user, turf, booking)



    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      start: new Date(booking.startTime).getHours() + new Date(booking.startTime).getMinutes() / 60,
      end: new Date(booking.endTime).getHours() + new Date(booking.endTime).getMinutes() / 60
    }));
    res.json(unavailableSlots);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/myBookings', authMiddleware, async (req, res) => {
  const userDoc = req.user;

  try {
    // Find bookings where the user is the one who booked (sorted descending)
    const userBookings = await Booking.find({ userId: userDoc._id })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    // Find turf documents where the user is the lister
    const turfs = await Turf.find({ lister_id: userDoc._id });

    // Extract turf IDs from the retrieved turfs
    const turfIds = turfs.map(turf => turf._id);

    // Find bookings where the user is the lister (sorted descending)
    const listerBookings = await Booking.find({ turfId: { $in: turfIds } })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

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
