import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

import { locations, movieTheaters } from '../mock/home';

import MovieCard from './MovieCard';

function Body() {
  const [movies, setMovies] = useState([]);
  const [cities] = useState(locations);
  const [selectedCity, setSelectedCity] = useState('');
  const [theaters, setTheaters] = useState({});
  const [selectedTheater, setSelectedTheater] = useState('');
  const currentDate = new Date();

  const currentMovies = movies.filter(
    (movie) => new Date(movie.release_date) <= currentDate
  );

  const upcomingMovies = movies.filter(
    (movie) => new Date(movie.release_date) > currentDate
  );

  const handleCityChange = (event) => {
    setTheaters(movieTheaters[event.target.value]);
    setSelectedCity(event.target.value);
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const fetchMovies = () => {
    if (selectedCity && selectedTheater) {
      axios
        .get(`/movie/getmovies/${selectedTheater}/${selectedCity}`)
        .then((res) => {
          
          let tempMovies = res.data;
          console.log(tempMovies);
          const now = new Date();
          const day = now.getDay();
          
          function applyTuesdayDiscount(movie) {
            movie.price = "$6";
          }

          function configureNightShows(movie) {
            if(parseInt(movie.start_time.split(":")[0]) >= 18)
            {
              movie.price = '$' + '' + (parseInt(movie.price.slice(1)) + 2);
            }
          }

          if (day === 2) {
            tempMovies.forEach(applyTuesdayDiscount);
          }

          
          tempMovies.forEach(configureNightShows);
          

          console.log("tempMovies");
          console.log(tempMovies);
          setMovies(tempMovies);  
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className='flex items-center justify-center bg-black rounded-lg shadow-lg'>
        <div className='m-4'>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className='w-full p-2 border rounded'
          >
            <option value=''>Select a City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {selectedCity && (
          <div className='m-4'>
            <select
              value={selectedTheater}
              onChange={handleTheaterChange}
              className='w-full p-2 border rounded'
            >
              <option value=''>Select a Theater</option>
              {theaters.map((theater, index) => (
                <option key={index} value={theater}>
                  {theater}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedCity && selectedTheater && (
          <div className='m-4'>
            <button
              onClick={fetchMovies}
              className={`p-2 bg-red-600 text-white rounded-lg`}
              type='button'
            >
              Search
            </button>
          </div>
        )}
      </div>
      {movies.length > 0 && (
        <div>
          <h1 className='m-4 text-slate-50 text-2xl font-semibold mb-4'>
            Current Movies
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {currentMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          <h1 className='m-4 text-slate-50 text-2xl font-semibold mt-8 mb-4'>
            Upcoming Movies
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {upcomingMovies.map((movie, index) => (
              <>
                <MovieCard key={movie._id} movie={movie} />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Body;
