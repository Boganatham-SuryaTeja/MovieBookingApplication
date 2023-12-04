const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: String,
  seat: String,
  title: String,
  language: String,
  theater: String,
  location: String,
  start_time: String,
  end_time: String,
  screen: String,
  isRefunded: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
