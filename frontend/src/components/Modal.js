import React, { useEffect, useState } from 'react';
import close from '../assets/icons/close.png';

function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (props?.cb) props.cb();
  };

  useEffect(() => {
    setIsOpen(props.showModal);
  }, []);

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='w-3/6 modal-container'>
            <div className='bg-white rounded-lg p-4'>
              <div
                onClick={closeModal}
                className='w-full text-right text-black'
              >
                <img className='inline w-6' src={close} alt='Close' />
              </div>
              <h2 className='text-xl font-semibold mb-4'>{props.heading}</h2>
              {props.children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
