import { useState } from 'react';
import { useSelector } from 'react-redux';

import axios from '../utils/axios';

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebase';

import location from '../assets/icons/location.png';
import text from '../assets/icons/text.png';
import seat from '../assets/icons/seat.png';
import deleteIcon from '../assets/icons/delete.png';
import edit from '../assets/icons/edit.png';
import clock from '../assets/icons/clock.png';

import ShowMessage from './ShowMessage';
import MovieBooking from './MovieBooking';
import Modal from './Modal';
import UpdateMovie from './UpdateMovie';

function MovieCard({ movie, cb = null }) {

  const user = useSelector((store) =>  store.user);
  const userId = auth?.currentUser?.uid;
  const [message, setMessage] = useState({});
  const [isBooking, setIsBooking] = useState(false);
  const [isupdateMovie, setIsUpdateMovie] = useState(false);

  const updateMovie = () => { };

  const showMessage = () => {
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  const deleteMovie = (ev) => {
    console.log(ev.target);
    axios
      .get(`/movie/deletemovie/${ev.target.id}`)
      .then((response) => {
        setMessage({
          className: 'border border-green-500 bg-green-100',
          message: response.data.message,
        });

        showMessage();
      })
      .catch((error) => {
        setMessage({
          className: 'border border-red-500 bg-red-100',
          message: error.message,
        });
      });
  };

  const cancelBooking = () => {
    axios
      .get(`/booking/cancel/${movie._id}`)
      .then((response) => {
        setMessage({
          className: 'border border-green-500 bg-green-100',
          message: response.data.message,
        });

        showMessage();
        if(cb) cb();
      })
      .catch((error) => {
        setMessage({
          className: 'border border-red-500 bg-red-100',
          message: error.message,
        });
      });

    axios.get(`/movie/getmovie/${movie.movieId}`)
      .then((res) => {
        const tempMovie = res.data;

        console.log(movie.seat);
        const tempArray = movie.seat.split(",");
        console.log("tempArray");
        console.log(tempArray);
        const seats = [];
        tempArray.forEach(element => {
          let x = (element.charAt(0).charCodeAt(0) - 65) + '-' + ((element[1]-1));
          seats.push(x)
        });

        const result = tempMovie.bookedSeats.filter(itemB => !seats.includes(itemB));

          const movieData = {
            _id: tempMovie._id,
            theater: tempMovie.theater,
            title: tempMovie.title,
            start_time: tempMovie.start_time,
            end_time: tempMovie.end_time,
            screen: tempMovie.screen,
            seating_capacity: tempMovie.seating_capacity,
            price: tempMovie.price,
            language: tempMovie.language,
            location: tempMovie.location,
            release_date: tempMovie.release_date,
            bookedSeats: [...result],
          };

          axios.post(`/movie/updatemovie`, movieData);
        console.log(seats);
      })


  };
  return (
    <>
      {Object.keys(message).length > 0 && <ShowMessage showMessage={message} />}
      <div className='bg-white rounded-lg shadow-md p-4 m-4'>
        <div className='pb-2 flex items-center justify-end'>
          {user?.isAdmin && (
            <>
              <img
                src={edit}
                className='w-5 mr-3 cursor-pointer'
                alt='Edit'
                id={movie._id}
                onClick={() => {
                  setIsUpdateMovie(true);
                }}
              />
              <img
                src={deleteIcon}
                className='w-5 cursor-pointer'
                alt='Delete'
                id={movie._id}
                onClick={deleteMovie}
              />
            </>
          )}
        </div>
        <div className='flex justify-between'>
          <h3 className='text-xl font-semibold mb-2'>{movie.title}</h3>
          <p className='text-gray-600 text-md font-semibold'>{movie.price}</p>
        </div>
        <div className='mb-2 flex items-center'>
          <img src={location} className='w-4 mr-1' alt='Location' />
          <span className='text-sm text-gray-600'>
            {movie.theater}, {movie.location}
          </span>
        </div>
        <div className='mb-2 flex items-center'>
          <img src={text} className='w-4 mr-1' alt='Language' />
          <span className='text-sm text-gray-600'>{movie.language}</span>
        </div>

        {movie.seat && (
          <div className='mb-2 flex items-center'>
            <img src={seat} className='w-4 mr-1' alt='Seat' />
            <p className='mr-1 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
              {movie.seat}
            </p>
          </div>
        )}

        <div className='mb-2 flex items-center'>
          <img src={clock} className='w-4 mr-1' alt='Clock' />
          <p className='mr-1 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
            {movie.start_time} - {movie.end_time}
          </p>
        </div>

        {userId && !movie.seat && (
          <div className='text-right'>
            <button
              className='p-1 m-1 text-xs bg-slate-900 hover:bg-slate-600 text-slate-50 rounded-sm'
              onClick={() => setIsBooking(!isBooking)}
            >
              Book
            </button>
          </div>
        )}

        {userId && movie.seat && (
          <div className='text-right'>
            <button
              className='p-1 m-1 text-xs bg-slate-900 hover:bg-slate-600 text-slate-50 rounded-sm'
              onClick={cancelBooking}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {isBooking && (
        <Modal
          showModal={isBooking}
          heading='You can book upto 8 seats'
          cb={() => setIsBooking(!isBooking)}
        >
          <MovieBooking userId={userId} movie={movie} />
        </Modal>
      )}

      {
        isupdateMovie && (
          <UpdateMovie movie={movie} visible={isupdateMovie} cb={() => {
            setIsUpdateMovie(!isupdateMovie)
          }}></UpdateMovie>
        )
      }

    </>
  );
}

export default MovieCard;
