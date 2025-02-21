import React, { useContext, useEffect, memo } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProfileListItems from '../components/ProfileListItems';
import CreditPoints from '../components/CreditPoints';

const Profile = () => {
  const { usersDetails, orderCount, fetchOrderDetails, getCreditScore } = useContext(ShopContext);

  useEffect(() => {
    getCreditScore();
    fetchOrderDetails();
  }, []);

  return (
    <div className='border-t-2 pt-4'>
      {
        usersDetails.length > 0 && (
          <div key={0}>
            <div className='text-2xl flex pl-4'>
              <Title text1={'Hi'} text3={usersDetails[0].users.name} className='uppercase text-gray-700' />
            </div>
            <div className='mt-4 flex items-center gap-2 md:gap-4'>
              <div className='flex flex-col pl-4'>
                <p className='flex justify-center items-center px-6 w-36 md:w-60 h-28 md:h-40 shadow-lg shadow-slate-500 bg-slate-100 text-5xl md:text-8xl'>{orderCount}</p>
                <p className='font-medium text-base md:text-lg w-36 md:w-60 h-auto py-3 px-6 text-center bg-gray-950 text-white'>Total No.Of Purchases</p>
              </div>
              <CreditPoints />
            </div>
            <ProfileListItems />
          </div>
        )
      }
    </div>
  );
}

export default memo(Profile);