import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingWidget.css';
import { useNavigate } from "react-router-dom";
import Popup from './PopupCard'; // Import Popup component

const timeRanges = [
    'Late Night',
    'Early Morning',
    'Afternoon',
    'Evening',
];

const BookingWidget = ({ turf }) => {
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [amount, setAmount] = useState(0);
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState({ 
        title: '', 
        message: '', 
        onClose: () => setShowPopup(false) 
    });

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    // Fetch unavailable slots based on the selected date
    useEffect(() => {
        const fetchUnavailableSlots = async () => {
            try {
                const response = await axios.get('/booking/unavailableSlots', {
                    params: { turfId: turf._id, date: date.toISOString().split('T')[0] }
                });
                setUnavailableSlots(response.data);
            } catch (error) {
                console.error('Error fetching unavailable slots:', error);
            }
        };

        fetchUnavailableSlots();
    }, [date, showOverlay]);

    // Update startTime, endTime, and amount when selected slots change
    useEffect(() => {
        if (selectedSlots.length > 0) {
            setStartTime(selectedSlots[0].start);
            setEndTime(selectedSlots[selectedSlots.length - 1].end);
            calculateAmount(selectedSlots[0].start, selectedSlots[selectedSlots.length - 1].end);
        }
    }, [selectedSlots]);

    const handleBooking = async () => {
        const startDateTime = new Date(date);
        startDateTime.setHours(Math.floor(startTime));
        startDateTime.setMinutes((startTime % 1) * 60);

        const endDateTime = new Date(date);
        endDateTime.setHours(Math.floor(endTime));
        endDateTime.setMinutes((endTime % 1) * 60);

        try {
            await axios.post('/booking/new', {
                turfId: turf._id,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                amount
            });

            setPopupContent({
                title: 'Success',
                message: 'Booking successful!',
                onClose: () => {
                    setShowPopup(false);
                    setShowOverlay(false);
                }
            });
            setShowPopup(true);
        } catch (error) {
            if (error.response?.status === 401) {
                setPopupContent({
                    title: 'Login Required',
                    message: 'Please log in first',
                    onClose: () => {
                        setShowPopup(false);
                        navigate("/login");
                    }
                });
                setShowPopup(true);
            } else {
                setPopupContent({
                    title: 'Error',
                    message: 'Failed to book turf.',
                    onClose: () => setShowPopup(false)
                });
                setShowPopup(true);
            }
        }
    };

    const calculateAmount = (start, end) => {
        const duration = (end - start);
        setAmount(duration * turf.price);
    };

    const markUnavailableSlots = (value) => {
        const now = new Date();
        const openTime = turf.open;
        const closeTime = turf.close;

        const [openHour, openMinute] = openTime.split(":").map(Number);
        const [closeHour, closeMinute] = closeTime.split(":").map(Number);
        const openValue = openHour + openMinute / 60;
        const closeValue = closeHour + closeMinute / 60;

        const isPast = date.toDateString() === now.toDateString() &&
                       value < now.getHours() + (now.getMinutes() / 60);

        const isOutsideBusinessHours = value < openValue || value >= closeValue;

        const isUnavailable = unavailableSlots.some(slot => 
            value >= slot.start && value < slot.end
        );

        return isPast || isOutsideBusinessHours || isUnavailable;
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour += 0.5) {
            const slot = {
                start: hour,
                end: hour + 0.5,
                label: `${formatTime(hour)} - ${formatTime(hour + 0.5)}`
            };
            slots.push(slot);
        }
        return slots;
    };

    const formatTime = (time) => {
        const hours = Math.floor(time);
        const minutes = (time % 1) === 0.5 ? '30' : '00';
        return `${hours}:${minutes}`;
    };

    const timeSlots = generateTimeSlots();
    const sectionSize = Math.ceil(timeSlots.length / 4);

    const getSectionTimeSlots = (section) => {
        const start = section * sectionSize;
        const end = Math.min(start + sectionSize, timeSlots.length);
        return timeSlots.slice(start, end);
    };

    const handleSlotSelection = (slot) => {
        if (selectedSlots.length === 0) {
            setSelectedSlots([slot]);
        } else {
            const lastSlot = selectedSlots[selectedSlots.length - 1];
            if (slot.start === lastSlot.end) {
                setSelectedSlots([...selectedSlots, slot]);
                setStartTime(selectedSlots[0].start);
                setEndTime(slot.end);
            } else {
                setSelectedSlots([slot]);
                setStartTime(slot.start);
                setEndTime(slot.end);
            }
        }
    };

    return (
        <div className="relative booking-widget p-8 bg-white rounded shadow-md mx-auto ">
            {/* Popup Component */}
            {showPopup && (
                <Popup
                    title={popupContent.title}
                    content={<p>{popupContent.message}</p>}
                    onClose={popupContent.onClose}
                />
            )}

            <h2 className="text-blue-600 text-2xl font-semibold mb-4">Book a Turf</h2>
            <Calendar
                className="calendar"
                onChange={setDate}
                value={date}
                minDate={new Date()}
                maxDate={maxDate}
            />

            <button className="bg-blue-500 text-white py-2 mt-4 px-4 rounded hover:bg-blue-600" onClick={() => setShowOverlay(true)}>View Slots</button>

            <div className="flex flex-col text-black">
                <p>Slot: {formatTime(startTime)} - {formatTime(endTime)}</p>
                <p>Amount: ₹{amount}</p>
                <button className="bg-blue-500 text-white py-2 mt-4 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400" onClick={handleBooking} disabled={selectedSlots.length === 0}>
                    Confirm Booking
                </button>
            </div>

            {showOverlay && (
                <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center p-4 z-50">
                    <div className="bg-white rounded shadow-lg p-4">
                        <h3 className="text-xl font-semibold mb-4">Select a Time Slot</h3>
                        <div className="flex justify-between mb-4">
                            {timeRanges.map((range, section) => (
                                <button
                                    key={section}
                                    className={`px-4 py-2 m-1 border rounded ${currentSection === section ? 'bg-blue-200' : 'bg-blue-100 text-blue-700'}`}
                                    onClick={() => setCurrentSection(section)}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {getSectionTimeSlots(currentSection).map((slot, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 border rounded ${selectedSlots.some(s => s.start === slot.start) ? 'bg-blue-950 text-white' : markUnavailableSlots(slot.start) ? 'bg-gray-300' : 'bg-blue-100 text-blue-700'}`}
                                    disabled={markUnavailableSlots(slot.start)}
                                    onClick={() => handleSlotSelection(slot)}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                        <button type="button" className="px-4 py-2 mt-1 justify-center flex m-auto border rounded bg-blue-950 text-white" onClick={() => setShowOverlay(false)}>
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingWidget;
