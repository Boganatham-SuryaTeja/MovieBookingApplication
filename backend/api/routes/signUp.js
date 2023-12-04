const express = require('express');

const signUpController = require('../controllers/signUpController');

const router = express.Router();

/**
 * Route for adding movie
 */
router.post('/admin', (request, response, next) => {
  console.log('Route for sign up admin', request.body);

  signUpController.signUpAdmin(request, response);
});

/**
 * Route for adding movie
 */
router.post('/', (request, response, next) => {
  console.log('Route for sign up', request.body);

  signUpController.signUp(request, response);
});

module.exports = router;
