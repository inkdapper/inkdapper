import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, getCreditScore, creditPoints } = useContext(ShopContext)
  const [creditPtsVisible, setCreditPtsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order, orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verify-razorpay', { ...response, ...orderData }, { headers: { token } })
          if (data.success) {
            console.log(data)
            setCartItems({})
            navigate('/orders')
            toast.success('Payment successful')
          } else {
            navigate('/place-order')
            toast.error('Payment failed, please try again')
          }
        } catch (error) {
          console.log(error)
          toast.error('Payment failed')
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee - creditPtsVisible
      }

      if (creditPtsVisible) {
        await axios.post(backendUrl + '/api/order/credit-clear', {}, { headers: { token } })
        console.log('Credit is cleared')
      } else {
        console.log('Credit is not cleared')
      }

      switch (method) {
        //API calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

          case 'razorpay':
            const razorpayResponse = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
            if (razorpayResponse.data.success) {
              initPay(razorpayResponse.data.order, orderData)
              console.log(razorpayResponse.data.order)
            }
          
          break;

        default:
          break
      }

    } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getCreditScore()
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" className='border border-gray-300 py-1.5 px-3.5 w-full' placeholder='Phone' />
      </div>

      {/* ---------Right side------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal
            creditPtsVisible={creditPtsVisible}
            setCreditPtsVisible={setCreditPtsVisible}
          />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ------------payment method------------ */}
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img src={assets.stripe_logo} alt="stripe_logo" className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''} `}></p>
              <img src={assets.razorpay_logo} alt="razorpay_logo" className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white text-xs md:text-sm my-2 md:my-8 px-6 md:px-8 py-3'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder