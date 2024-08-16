const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to set COOP and COEP headers
// app.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
//     res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     next();
// });

// Middleware - Convert response to JSON
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());

// Static files
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
const guestRoute = require('./routes/guestRoute');
app.use('/guest/', guestRoute);

const listerRoute = require('./routes/listerRoute');
app.use('/lister/', listerRoute);

const userRoute = require('./routes/userRoute');
app.use('/user/', userRoute);

const bookingRoute = require('./routes/BookingRoute');
app.use('/booking/', bookingRoute);

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
