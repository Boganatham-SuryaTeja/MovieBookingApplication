const express = require('express');

const movieController = require('../controllers/movieController');

const router = express.Router();

/**
 * Route for fetching movies
 */
router.get('/getmovie/:movieId', (request, response, next) => {
  console.log('Route for fetching movie', request.params.movieId);

  movieController.fetchMovie(request, response);
});

/**
 * Route for fetching movies
 */
router.get('/getmovies/:theater/:location', (request, response, next) => {
  console.log(
    'Route for fetching movies',
    request.params.theater,
    request.params.location
  );

  movieController.fetchMovies(request, response);
});

/**
 * Route for adding movie
 */
router.post('/addmovie', (request, response, next) => {
  console.log('Route for adding movie', request.body);

  movieController.addMovie(request, response);
});

/**
 * Route for updating movie
 */
router.post('/updatemovie', (request, response, next) => {
  console.log('Route for updating movie', request.body);

  movieController.updateMovie(request, response);
});

/**
 * Route for updating movie
 */
router.get('/deletemovie/:movieId', (request, response, next) => {
  console.log('Route for delete movie', request.params);

  movieController.deleteMovie(request, response);
});

module.exports = router;
