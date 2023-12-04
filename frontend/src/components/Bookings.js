// Bookings.js

import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard'; // Import your MovieCard component
import axios from '../utils/axios'; // You may need to install axios if not already done
import { auth } from '../utils/firebase';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = auth.currentUser.uid; // Assuming auth.currentUser is correctly set

  useEffect(() => {
    // Make an API call to fetch the user's bookings
    axios
      .get(`/booking/user/${userId}`)
      .then((response) => {
        setBookings(response.data); // Assuming the response contains the booking data
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [userId]);

  return (
    <div className='h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {bookings.map(
          (booking) =>
            !booking.isRefunded && (
              <MovieCard key={booking._id} movie={booking} />
            )
        )}
      </div>
    </div>
  );
};

export default Bookings;
