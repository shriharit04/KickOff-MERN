import React, { useEffect, useState } from 'react';
import AccountNavbar from '../components/AccountNavbar';
import axios from 'axios';

function MyBooking() {
  const [userBookings, setUserBookings] = useState([]);
  const [listerBookings, setListerBookings] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // Update booking statuses
        const putResponse = await axios.put('/booking/updateBookingStatus');

        // Fetch updated bookings
        const response = await axios.get('/booking/myBookings');
        const data = response.data;

        setUserBookings(data.userBookings);
        setListerBookings(data.listerBookings);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  // Helper function to determine the CSS class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white'; // Bright green
      case 'Ongoing':
        return 'bg-yellow-600 text-black'; // Bright yellow
      default:
        return 'bg-blue-600 text-white'; // Bright blue
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:mx-1 mg:mx-6">
      <AccountNavbar activeClass={"bookings"} />

      {userBookings.length > 0 && (
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">User Bookings</h2>
          {userBookings.map((booking, index) => (
            <div
              key={index}
              className={`p-4 mb-4 rounded-lg shadow-lg ${getStatusClass(booking.status)}`}
            >
              <p><strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(booking.endTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}

      {listerBookings.length > 0 && (
        <div className="p-4 bg-white shadow-md rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Lister Bookings</h2>
          {listerBookings.map((booking, index) => (
            <div
              key={index}
              className={`p-4 mb-4 rounded-lg shadow-lg ${getStatusClass(booking.status)}`}
            >
              <p><strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(booking.endTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooking;
