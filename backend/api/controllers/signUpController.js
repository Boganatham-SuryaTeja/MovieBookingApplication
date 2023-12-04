const bcrypt = require('bcrypt');
const signUpAdmin = require('../models/admin');
const signUpUser = require('../models/signUp');

/**
 *
 * @param {Object} request
 * @param {Object} response
 * @param {String} hash
 *
 * Save employee to DB
 */
const saveAdmin = (request, response, hash) => {
  const employee = new signUpAdmin({
    username: request.body.username,
    email: request.body.email,
    password: hash,
    employeeType: request.body.employeetype,
  });

  employee
    .save()
    .then((emp) => {
      response.status(201).json({
        message: 'Employee created',
      });
    })
    .catch((err) => {
      response.status(500).json({
        error: err,
      });
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 * @param {String} hash
 *
 * Save user to DB
 */
const saveUserToDB = (request, response, hash) => {
  console.log('Save user to DB in saveUserToDB', request);

  const user = new signUpUser({
    username: request.body.username,
    email: request.body.email,
    password: hash,
  });

  user
    .save()
    .then((res) => {
      response.status(201).json({
        message: 'User Sign Up Successful',
      });
    })
    .catch((err) => {
      response.status(500).json({
        error: err,
      });
    });
};

const findUser = (finder, request, response, callback) => {
  console.log('Find user in findUser in sign up', finder);

  finder
    .find({
      email: request.body.email,
    })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return response.status(409).json({
          message: 'User with below email already exists',
        });
      } else {
        bcrypt.hash(request.body.password, 10, (error, hash) => {
          if (error) {
            return response.status(500).json({
              error: error,
            });
          } else {
            callback(request, response, hash);
          }
        });
      }
    });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Sign up and create employee
 */
exports.signUpAdmin = (request, response) => {
  findUser(signUpAdmin, request, response, saveAdmin);
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 *
 * Sign up and create user
 */
exports.signUp = (request, response) => {
  findUser(signUpUser, request, response, saveUserToDB);
};
