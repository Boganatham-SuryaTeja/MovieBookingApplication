import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { auth, db } from '../utils/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

import { addUser } from '../utils/store/userSlice';

import star from '../assets/icons/star.png';

import Modal from './Modal';
import Form from './Form';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isPremiumUser, setIsPremiumUser] = useState(user?.isPremiumUser);
  const [rewardPoints, setRewardPoints] = useState(user?.rewardPoints);
  const [enabled, setEnabled] = useState(false);
  const { displayName, email } = auth?.currentUser;
  const userUid = auth?.currentUser.uid;
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', userUid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const rewardPoints = userData?.rewardPoints || 0;    
      const isAdmin = userData?.isAdmin || false;

      setRewardPoints(docSnap.data()?.rewardPoints || 0);

      dispatch(
        addUser({
          uid: userUid,
          email: email,
          displayName: displayName,
          isAdmin: isAdmin,
          isPremiumUser: isPremiumUser,
          rewardPoints: rewardPoints
        })
      );  
    }

    fetchData();
  }, []);

  const onSubmitPayment = async (ev) => {
    ev.preventDefault();
    const additionalData = {
      isPremiumUser: !isPremiumUser
    };

    setIsPremiumUser(!isPremiumUser);
    await updateUserProfile(userUid, additionalData);
  };

  const updateUserProfile = async (uid, additionalData) => {
    const userRef = doc(db, 'users', uid);

    await setDoc(userRef, additionalData, { merge: true })
      .then(() => {
        console.log('User profile updated successfully', auth.currentUser);
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
      });

    setEnabled(!enabled);
  };

  const handleTogglePremium = () => {
    setEnabled(!enabled);
  };

  return (
    <div className='h-screen'>
      <div className='left-0 right-0 m-auto mt-24 w-2/6 bg-white shadow-md p-4 rounded-lg'>
        <h2 className='p-4 text-3xl font-semibold mb-4'>User Profile</h2>
        <div className='p-4 mb-4'>
          <span className='font-semibold'>Display Name: </span>
          {displayName || 'N/A'}
        </div>
        <div className='p-4 mb-4'>
          <span className='font-semibold'>Email:</span> {email || 'N/A'}
        </div>
        <div className='p-4 mb-4'>
          <span className='font-semibold'>Reward Points:</span> {rewardPoints || 'N/A'}
        </div>
        <div className='flex items-center justify-between p-4 pb-0'>
          <div className='flex items-center'>
            <span className='mr-4 text-black font-semibold'>
              {!isPremiumUser ? 'Enable Premium' : 'Premium User'}
            </span>
            {!isPremiumUser && (
              <>
                <Switch
                  checked={enabled}
                  onClick={handleTogglePremium}
                  className={`${
                    enabled ? 'bg-black' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className='sr-only'>Purchase Premium</span>
                  <span
                    className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <span className='px-4 text-xs text-slate-600'>
                  $15 per year
                </span>
              </>
            )}
          </div>
          {isPremiumUser && (
            <img className='w-8 cursor-pointer' src={star} alt='Premium User' />
          )}
        </div>
        {!isPremiumUser && (
          <span className='px-4 text-xs text-slate-600'>
            With premium you don't pay service fee
          </span>
        )}
        {enabled && (
          <Modal showModal={enabled} heading='Premium Subscription'>
            <Form id='premiumSubscription' onSubmit={onSubmitPayment}>
              <div className='my-2'>
                <label className='block mb-1 text-sm font-semibold'>
                  Amount
                </label>
                <input
                  className='p-2 mb-2 border border-1 w-full'
                  disabled='disabled'
                  placeholder='Enter card number'
                  type='number'
                  value='15'
                />
              </div>
              <div className='my-2'>
                <label className='block mb-1 text-sm font-semibold'>
                  Card Number
                </label>
                <input
                  className='p-2 mb-2 border border-1 w-full'
                  placeholder='Enter card number'
                  type='text'
                />
              </div>
              <div className='my-2'>
                <label className='block mb-1 text-sm font-semibold'>
                  Expiry date
                </label>
                <input
                  className='p-2 mb-2 border border-1 w-full'
                  placeholder='Enter expiry date MM/YY'
                  type='text'
                />
              </div>
              <div className='my-2'>
                <label className='block mb-1 text-sm font-semibold'>CVV</label>
                <input
                  className='p-2 mb-2 border border-1 w-full'
                  placeholder='Enter CVV'
                  type='number'
                />
              </div>
              <button
                className='p-2 bg-black text-slate-50 hover:bg-slate-700'
                type='submit'
              >
                {' '}
                Make Payment{' '}
              </button>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Profile;
