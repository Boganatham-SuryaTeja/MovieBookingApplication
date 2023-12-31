import React, { useState } from 'react';

import axios from '../utils/axios';

import ModalFormWrapper from './ModalFormWrapper';
import Form from './Form';
import ShowMessage from './ShowMessage';
import FormWrapper from './FormWrapper';
import moment from "moment"

const UpdateMovie = (params) => {

    if(params.movie)
    {
      params.movie.release_date = moment(params.movie.release_date).format("YYYY-MM-DD");
    }

    
  const [theater, setTheater] = useState(params.movie.theater);
  const [title, setTitle] = useState(params.movie.title);
  const [startTime, setStartTime] = useState(params.movie.start_time);
  const [endTime, setEndTime] = useState(params.movie.end_time);
  const [screen, setScreen] = useState(params.movie.screen);
  const [seatingCapacity, setSeatingCapacity] = useState(params.movie.seating_capacity);
  const [price, setPrice] = useState(params.movie.price);
  const [language, setLanguage] = useState(params.movie.language);
  const [location, setLocation] = useState(params.movie.location);
  const [releaseDate, setReleaseDate] = useState(params.movie.release_date);
  const [message, setMessage] = useState({});

  const showMessage = () => {
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  const resetForm = () => {
    setTheater('');
    setTitle('');
    setStartTime('');
    setEndTime('');
    setScreen('');
    setSeatingCapacity('');
    setPrice('');
    setLanguage('');
    setLocation('');
    setReleaseDate('');
  };

  const onSubmitForm = (ev) => {
    ev.preventDefault();

    console.log(startTime);
    const movieData = {
      _id: params.movie._id,
      theater: theater,
      title: title,
      start_time: startTime,
      end_time: endTime,
      screen: screen,
      seating_capacity: seatingCapacity,
      price: price,
      language: language,
      location: location,
      release_date: releaseDate,
    };

    axios
      .post('/movie/updatemovie', movieData)
      .then((response) => {
        setMessage({
          className: 'border border-green-500 bg-green-100',
          message: response.data.message,
        });

        showMessage();
        resetForm();
      })
      .catch((error) => {
        setMessage({
          className: 'border border-red-500 bg-red-100',
          message: error.message,
        });
        console.log(error);
      });
  };

  return (
    
    <ModalFormWrapper visible = {params.visible} cb = {params.cb}>
    {Object.keys(message).length > 0 && <ShowMessage showMessage={message} />}
    <h1 className='text-3xl'> Update Movie </h1>
    <Form id='updatemovie' onSubmit={onSubmitForm}>
      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Theater</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder={params.movie.theater}
          type='text'
          name='theater'
          value={theater}
          onChange={(e) => setTheater(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Title</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter title'
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Start Time</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter start time'
          type='time'
          name='start_time'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>End Time</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter end time'
          type='time'
          name='end_time'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Screen</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter screen number'
          type='number'
          name='screen'
          value={screen}
          onChange={(e) => setScreen(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>
          Seating Capacity
        </label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter seating capacity'
          type='number'
          name='seating_capacity'
          value={seatingCapacity}
          onChange={(e) => setSeatingCapacity(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Price</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter price'
          type='text'
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Language</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter language'
          type='text'
          name='language'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>Location</label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter location'
          type='text'
          name='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className='my-2'>
        <label className='block mb-1 text-sm font-semibold'>
          Release Date
        </label>
        <input
          required='required'
          className='p-2 mb-2 text-black border border-1 w-full'
          placeholder='Enter release date'
          type='date'
          name='release_date'
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>

      <button
        className='p-2 bg-slate-50 text-slate-900 hover:bg-slate-300 rounded-lg'
        type='submit'
      >
        Update Movie
      </button>
    </Form>
  </ModalFormWrapper>

  );
};

export default UpdateMovie;
