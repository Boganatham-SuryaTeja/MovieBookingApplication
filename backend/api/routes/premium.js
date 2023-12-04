const express = require('express');

const premiumController = require('../controllers/premiumController');

const router = express.Router();

/**
 * Route for premium user
 */
router.post('/', (request, response, next) => {
  console.log('Route for premium', request.body);

  premiumController.premiumUser(request, response);
});

module.exports = router;
