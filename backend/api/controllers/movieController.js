const Movie = require('../models/movie');

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Add Movie
 */
exports.addMovie = (request, response) => {
  const newMovie = new Movie(request.body);

  newMovie
    .save()
    .then(() => {
      console.log('Movie added successfully');

      response.status(200).json({
        message: 'Movie added successfully',
      });
    })
    .catch((error) => {
      console.error('Error adding movie:', error);

      response.status(500).json({
        message: 'Error adding movie',
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Delete Movie
 */
exports.deleteMovie = (request, response) => {
  console.log(request.params.movieId);
  Movie.findOneAndDelete({ _id: request.params.movieId })
    .then(() => {
      console.log('Movie deleted successfully');

      response.status(200).json({
        message: 'Movie deleted successfully',
      });
    })
    .catch((error) => {
      console.error('Error deleting movie:', error);

      response.status(500).json({
        message: 'Error deleting movie',
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Update Movie
 */
exports.updateMovie = (request, response) => {
  const updatedMovie = new Movie(request.body);

  Movie.findByIdAndUpdate(request.body._id, updatedMovie, { new: true })
    .exec()
    .then((document) => {
      console.log('Movie updated successfully', document);

      response.status(200).json({
        message: 'Movie updated successfully',
      });
    })
    .catch((error) => {
      console.error('Error updating movie:', error);

      response.status(500).json({
        message: 'Error updating movie',
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Fetch Movie by id
 */
exports.fetchMovie = (request, response) => {
  Movie.findById(request.params.movieId)
    .then((movie) => {
      console.log('Movie fetched successfully', movie);

      response.status(200).json(movie);
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
 * Fetch Movies
 */
exports.fetchMovies = (request, response) => {
  const query = {
    $and: [
      { location: request.params.location },
      { theater: request.params.theater },
    ],
  };

  Movie.find(query)
    .then((movies) => {
      console.log('Movies fetched successfully', movies);

      response.status(200).json(movies);
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);

      response.status(500).json({
        message: 'Error fetching movies',
      });
    });
};
