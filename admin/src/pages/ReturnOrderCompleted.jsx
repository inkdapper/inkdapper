import React, { useContext, useEffect, useState } from 'react';
import { currency } from '../App';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const ReturnOrderCompleted = () => {
  const { orders } = useContext(ShopContext);
  return (

    <div>
      <h3 className='font-semibold mt-3 text-2xl mb-3'>Return Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            console.log(order),
            order.returnOrderStatus === "Return Confirmed" && (
              <div key={index} className='border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_1.5fr_1fr_1fr] gap-3 items-start'>
                  <img className='w-12' src={assets.parcel_icon} alt="" />
                  <div>
                    <div>
                      {
                        order.items.map((item, index) => {
                          if (index === order.items.length - 1) {
                            return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span></p>
                          } else {
                            return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span>,</p>
                          }
                        })
                      }
                    </div>
                    <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                    <div>
                      <p>{order.address.street + ","}</p>
                      <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                    </div>
                    <p>{order.address.phone}</p>

                    <div className='mt-3'>
                      <p className='text-sm sm:text-[15px]'>Order Id :</p>
                      <p className='text-sm font-light'>{order._id}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                    <p className='mt-3'>Method : {order.paymentMethod}</p>
                    <p className='mt-2'>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                    <p className='mt-2'>Order Placed Date : <span>{new Date(order.date).toLocaleDateString()}</span></p>
                    {order.status === "Delivered" && (
                      <p>Delivered Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div>
                    <div className='mb-4'>
                      <p className='text-sm sm:text-[15px]'>Total Amount :</p>
                      <p className='text-2xl pt-1 font-medium'>{currency} {order.amount}</p>
                    </div>
                    <p className='text-sm sm:text-[15px]'>Return Order Status :</p>
                    <p className='text-2xl font-medium'>{order.returnOrderStatus}</p>
                  </div>
                </div>

                <div className='mt-8'>
                  <p className='text-sm sm:text-[20px] text-red-500 mb-1'>Return Reason :</p>
                  <p className='text-3xl font-medium'>{order.returnReason}</p>
                </div>
              </div>
            )
          ))
        }
      </div>
    </div>
  )
}

export default ReturnOrderCompleted