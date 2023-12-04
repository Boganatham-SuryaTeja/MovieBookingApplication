const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const movieRoute = require('./api/routes/movie');
const signUpRoute = require('./api/routes/signUp');
const loginRoute = require('./api/routes/login');
const premiumRoute = require('./api/routes/premium');
const bookingRoute = require('./api/routes/booking');

const app = express();

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@cluster0.bdygguu.mongodb.net/`
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    request.header('Access-Control-Allow-Methods', '*');
    return response.status(200).json({});
  }

  next();
});

app.use('/movie', movieRoute);
app.use('/signup', signUpRoute);
app.use('/login', loginRoute);
app.use('/premium', premiumRoute);
app.use('/booking', bookingRoute);

app.use((request, response, next) => {
  const error = new Error('Not found API');
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
