import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';


const Orders = () => {
  const {backendUrl, token, currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try{
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userOrders', {}, {headers: {token}})
      if(response.data.success){
        let allOrderItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
        
      }
    }
    catch(error){

    }
  }

  useEffect(()=>{
    loadOrderData()
  }, [token])

  return (
    <div className='pt-8 border-t border-gray-100'>
      <div className='mb-6'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      {orderData.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/60 rounded-3xl border border-dashed border-gray-200 my-8'>
          <div className='w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm'>
            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-900 mb-1.5'>No orders placed yet</h3>
          <p className='text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed'>
            When you complete a purchase, your order history and live delivery tracking will appear here.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-3 my-6'>
          {orderData.map((item, index)=>(
            <div key={index} className='p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-gray-200 transition-all'>
              <div className='flex items-start gap-4 sm:gap-5 flex-1 min-w-0'>
                <img 
                  className='w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover object-top border border-gray-100 flex-shrink-0' 
                  src={item.images?.[0] || item.image?.[0] || ''} 
                  alt={item.name} 
                />
                <div className='min-w-0 flex-1'>
                  <p className='text-sm sm:text-base font-semibold text-gray-900'>{item.name}</p>
                  <div className='flex flex-wrap items-center gap-3 mt-1.5 text-xs sm:text-sm text-gray-700'>
                    <span className='font-bold text-gray-900'>{currency}{item.price}</span>
                    <span className='text-gray-400'>•</span>
                    <span>Qty: <strong className='text-gray-900'>{item.quantity}</strong></span>
                    <span className='text-gray-400'>•</span>
                    <span className='px-2 py-0.5 border border-gray-200 bg-gray-50 rounded text-xs font-semibold text-gray-700'>Size: {item.size}</span>
                  </div>
                  <div className='flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500'>
                    <span>Date: <strong className='text-gray-700 font-medium'>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
                    <span>Method: <strong className='text-gray-700 font-medium uppercase'>{item.paymentMethod}</strong></span>
                  </div>
                </div>
              </div>

              <div className='md:w-1/3 flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-none border-gray-100'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80'>
                  <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
                  <span>{item.status}</span>
                </div>
                <button 
                  onClick={loadOrderData} 
                  className='px-5 py-2.5 rounded-full border border-gray-300 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all shadow-sm'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders;
