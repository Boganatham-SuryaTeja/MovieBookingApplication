const express = require('express');

const bookingController = require('../controllers/bookingController');

const router = express.Router();

/**
 * Route for booking movie
 */
router.post('/', (request, response, next) => {
  console.log('Route for booking movie', request.body);

  bookingController.bookingMovie(request, response);
});

router.get('/fetchbookings', (request, response, next) => {
  console.log('Route for fectch bookings', request);

  bookingController.fetchBookings(request, response);
});

/**
 * Route for booked movies
 */
router.get('/user/:userId', (request, response, next) => {
  console.log('Route for booked movies', request.params);

  bookingController.bookedMovies(request, response);
});

/**
 * Route for cancel booking
 */
router.get('/cancel/:bookingId', (request, response, next) => {
  console.log('Route for cancel booking', request.params);

  bookingController.cancelBooking(request, response);
});

module.exports = router;
