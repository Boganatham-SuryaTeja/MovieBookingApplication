import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';

import App from './App';
import Body from './components/Body';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import AddMovie from './components/AddMovie';
import Analytics from './components/Analytics';
import Bookings from './components/Bookings';
import UpdateMovie from './components/UpdateMovie';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/addmovie',
        element: <AddMovie />,
      },
      {
        path: '/updatemovie',
        element: <UpdateMovie />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
