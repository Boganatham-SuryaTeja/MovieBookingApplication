const Booking = require('../models/booking');

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Booking Movie
 */
exports.bookingMovie = (request, response) => {
  const newMovie = new Booking(request.body);

  console.log(newMovie);
  newMovie
    .save()
    .then(() => {
      console.log('Movie booked successfully');

      response.status(200).json({
        message: 'Movie booked successfully',
      });
    })
    .catch((error) => {
      console.error('Error booking movie:', error);

      response.status(500).json({
        message: 'Error booking movie',
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Booked Movies
 */
exports.bookedMovies = (request, response) => {
  Booking.find({ userId: request.params.userId })
    .then((movies) => {
      console.log('Movie fetched successfully', movies);

      response.status(200).json(movies);
    })
    .catch((error) => {
      console.error('Error fetching movie:', error);

      response.status(500).json({
        message: 'Error fetching movie',
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Cancel Booking
 */
exports.cancelBooking = (request, response) => {
  Booking.findOne({ _id: request.params.bookingId })
    .then((movie) => {
      console.log('Movie cancelled successfully', movie);

      if (movie) {
        movie.isRefunded = true;

        movie
          .save()
          .then((res) => {
            response.status(201).json({
              message: 'Refund successful',
            });
          })
          .catch((err) => {
            response.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((error) => {
      console.error('Error cancelling movie:', error);

      response.status(500).json({
        message: 'Error cancelling movie',
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Booked Movies
 */
exports.fetchBookings = (request, response) => {
  Booking.find()
    .then((bookings) => {
      console.log('Fetch bookings', bookings);

      response.status(201).json(bookings);
    })
    .catch((err) => {
      response.status(500).json({
        error: err,
      });
    });
};
