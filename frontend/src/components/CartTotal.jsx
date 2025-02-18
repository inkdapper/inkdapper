import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = ({ creditPtsVisible, setCreditPtsVisible }) => {
    const { currency, delivery_fee, getCartAmount, creditPoints } = useContext(ShopContext)

    return (
        <div className='w-full relative'>
            <div className="text-xl md:text-2xl lg:text-3xl">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className={`absolute right-0 top-0 ${location.pathname === '/place-order' ? 'block' : 'hidden'}`}>
                <p onClick={() => setCreditPtsVisible(!creditPtsVisible && creditPoints)} className='text-green-700 underline underline-offset-4 cursor-pointer text-sm md:text-base'>
                    {creditPtsVisible ? 'Remove Credit Points' : 'Use Credit Points'}
                </p>
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr />
                <div className={`flex justify-between ${location.pathname === '/place-order' ? 'block' : 'hidden'}`}>
                    <p>Credit Points</p>
                    <p>{currency} {creditPtsVisible ? creditPoints : 0}.00</p> {/* Use creditPtsVisible to show points */}
                </div>
                <hr className={`${location.pathname === '/place-order' ? 'block' : 'hidden'}`} />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee - (creditPtsVisible ? creditPoints : 0)}.00</b> {/* Adjust total calculation */}
                </div>
            </div>
        </div>
    )
}

export default CartTotal