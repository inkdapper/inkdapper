import React from 'react'
import OrderTable from '../components/OrderTable'

const Dashboard = ({token}) => {

  return (
    <div className='relative'>
        <h1 className='font-semibold mt-3 text-2xl mb-3'>Dashboard</h1>
        <div className='inline-flex gap-2 items-center mb-3'>
          <h2 className='font-medium text-lg'>Order Details</h2>
          <p className='w-10 sm:w-14 h-[1px] sm:h-[2px] bg-gray-700'></p>
        </div>
      <OrderTable token={token}/>
    </div>
  )
}

export default Dashboard