import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

import logo from '../assets/logo.png';
import profile from '../assets/icons/profile.png';
import signout from '../assets/icons/signout.png';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className='px-12 py-2 top-0 sticky z-10 flex items-center justify-between bg-black text-slate-50'>
      <img className='px-8 py-2 w-32' src={logo} alt='Logo' />
      <ul className='mr-2 flex items-center justify-between'>
        <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
          <Link to='/'> Home </Link>
        </li>
        {!user && (
          <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
            <Link to='/login'> Log In </Link>
          </li>
        )}
        {user?.isAdmin && (
          <>
            <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
              <Link to='/addmovie'> Add Movie </Link>
            </li>
            <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
              <Link to='/analytics'> Analytics </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
              <Link to='/bookings'> Bookings </Link>
            </li>
            <div className='ml-2 relative inline-block text-left'>
              <img
                className='w-8 cursor-pointer'
                src={profile}
                alt='Profile'
                onClick={toggleDropdown}
              />
              {isOpen && (
                <div
                  className='text-center absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md'
                  onClick={closeDropdown}
                >
                  <Link
                    to='/profile'
                    className='text-center block p-4 text-gray-800 hover:bg-gray-100 rounded-md border-b'
                  >
                    Profile
                  </Link>
                  <img
                    className='inline w-8 m-2 cursor-pointer'
                    src={signout}
                    alt='Sign Out'
                    onClick={onClickSignOut}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
