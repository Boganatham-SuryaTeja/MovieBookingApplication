import React from 'react';

const Footer = () => {
  return (
    <div className='p-4 flex justify-around items-center'>
      <p className='text-slate-50'>© CMPE 202</p>
      <ul className='mr-2 flex justify-between'>
        <li className='mr-2 cursor-pointer text-slate-50 hover:text-slate-600'>
          FAQ
        </li>
        <li className='mr-2 cursor-pointer text-slate-50 hover:text-slate-600'>
          Terms of Use
        </li>
      </ul>
    </div>
  );
};

export default Footer;
