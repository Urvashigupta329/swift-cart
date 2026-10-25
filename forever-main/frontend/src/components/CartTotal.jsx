import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
    const amount = getCartAmount();
    const total = amount === 0 ? 0 : amount + delivery_fee;

  return (
    <div className='w-full bg-gray-50/80 rounded-3xl p-6 sm:p-7 border border-gray-100/90 shadow-sm'>
        <div className='mb-3'>
            <Title text1={'ORDER'} text2={'SUMMARY'}/>
        </div>
        <div className='flex flex-col gap-3 text-sm text-gray-600'>
            <div className='flex justify-between'>
                <span>Subtotal</span>
                <span className='font-semibold text-gray-900'>{currency}{amount}.00</span>
            </div>
            <div className='flex justify-between'>
                <span>Estimated Shipping</span>
                <span className='font-semibold text-gray-900'>{amount === 0 ? `${currency}0.00` : `${currency}${delivery_fee}.00`}</span>
            </div>
            <hr className='border-gray-200/80 my-1' />
            <div className='flex justify-between text-base font-bold text-gray-900 pt-1'>
                <span>Total</span>
                <span>{currency}{total}.00</span>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
