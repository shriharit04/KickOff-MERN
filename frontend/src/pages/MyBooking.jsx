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
      }
    };

    fetchBookingData();
  }, []);

  // Helper function to determine the CSS class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-800 text-white';
      case 'Ongoing':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div>
      <AccountNavbar activeClass={"bookings"} />

      {userBookings.length > 0 && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">User Bookings</h2>
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
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Lister Bookings</h2>
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
