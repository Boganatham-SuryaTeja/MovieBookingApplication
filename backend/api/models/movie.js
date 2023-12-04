const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  theater: String,
  title: String,
  start_time: String,
  end_time: String,
  screen: Number,
  seating_capacity: Number,
  price: String,
  language: String,
  location: String,
  release_date: Date,
});

module.exports = mongoose.model('Movie', movieSchema);
