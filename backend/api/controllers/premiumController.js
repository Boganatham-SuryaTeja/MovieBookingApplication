const signUpUser = require('../models/signUp');

exports.premiumUser = (request, response, hash) => {
  console.log('Save user to DB in saveUserToDB', request.body);

  signUpUser
    .findById(request.body.id)
    .then((user) => {
      console.log('User fetched successfully', user);

      if (user) {
        user.isPremiumUser = true;

        user
          .save()
          .then((res) => {
            response.status(201).json({
              message: 'Premium subscription successful',
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
      console.error('Error fetching user:', error);

      response.status(500).json({
        message: 'Error fetching user',
      });
    });
};
