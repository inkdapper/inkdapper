import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProfileListItems = () => {

  const { backendUrl, token, currency, scrollToTop } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [orderDataOne, setOrderDataOne] = useState([])

  const fetchOrderDetails = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/user-details', {}, { headers: { token } })
      if (response.data.success) {
        setOrderData(response.data.orders.reverse().slice(0, 6))
        setOrderDataOne(response.data.orders.slice(0, 5))
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [token]);


  return (
    <div>
      <div className=''>
        <h2 className='mt-8 pl-4 text-2xl text-gray-500'>Your <span className='font-medium text-gray-700'>Recent Orders</span></h2>
        <div className='w-full overflow-x-auto p-4 md:w-full md:overscroll-x-none md:p-8'>
          <div className='inline-flex md:flex gap-3 mt-4 mr-4'>
            {
              orderData.map((item, index) => (
                <Link key={index} to={`/order-details/${item._id}`}
                  className={`${index === 0 ? 'w-60 h-64 md:w-96 md:h-96' :
                    index === 1 ? 'w-60 h-64 md:w-80 md:h-80' :
                      index === 2 ? 'w-60 h-64 md:w-72 md:h-72' :
                        index === 3 ? 'w-60 h-64 md:w-64 md:h-64' :
                          index === 4 ? 'w-60 h-64 md:w-56 md:h-56' : 'md:w-48 md:h-48'
                    }`}>
                  <img src={item.items[0].image[0]} alt="" className='w-60 h-64 md:w-[100%] md:h-[100%] rounded-md object-contain transition-shadow shadow-[5px_5px_rgba(0,0,0,_0.4),_10px_10px_rgba(0,0,0,_0.3),_15px_15px_rgba(0,0,0,_0.2),_20px_20px_rgba(0,0,0,_0.1),_25px_25px_rgba(0,0,0,_0.05)] bg-[#ECECEC] hover:shadow-[2px_2px_rgba(0,0,0,_0.4),_4px_4px_rgba(0,0,0,_0.3),_6px_6px_rgba(0,0,0,_0.2),_8px_8px_rgba(0,0,0,_0.1),_10px_10px_rgba(0,0,0,_0.05)]' />
                </Link>
              ))
            }
          </div>

        </div>
      </div>
      <div className=''>
        <h2 className='mt-8 pl-4 text-2xl text-gray-500'>Buy <span className='font-medium text-gray-700'>Again</span></h2>
        <div className='w-full overflow-x-auto p-4 md:w-full md:overscroll-x-none md:p-8'>
          <div className='inline-flex md:flex gap-3 mt-4 mr-4'>
            {
              orderDataOne.map((item, index) => (
                <Link key={index} to={`/product/${item.items[0]._id}`}
                  className={`${index === 2 ? 'w-60 h-64 md:w-96 md:h-96' :
                    index === 1 ? 'w-60 h-64 md:w-80 md:h-80' :
                      index === 0 ? 'w-60 h-64 md:w-72 md:h-72' :
                        index === 3 ? 'w-60 h-64 md:w-80 md:h-80' :
                          index === 4 ? 'w-60 h-64 md:w-72 md:h-72' : 'w-60 h-64 md:w-56 md:h-56'
                    }`} onClick={scrollToTop()}>
                  <img src={item.items[0].image[0]} alt="" className='w-[100%] h-[100%] rounded-md object-contain transition-shadow shadow-[5px_5px_rgba(0,0,0,_0.4),_10px_10px_rgba(0,0,0,_0.3),_15px_15px_rgba(0,0,0,_0.2),_20px_20px_rgba(0,0,0,_0.1),_25px_25px_rgba(0,0,0,_0.05)] bg-[#ECECEC] hover:shadow-[2px_2px_rgba(0,0,0,_0.4),_4px_4px_rgba(0,0,0,_0.3),_6px_6px_rgba(0,0,0,_0.2),_8px_8px_rgba(0,0,0,_0.1),_10px_10px_rgba(0,0,0,_0.05)]' />
                </Link>
              )).reverse()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileListItems