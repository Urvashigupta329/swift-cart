import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 py-16 my-8'>
        <div className='bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100/90 hover:border-gray-200 hover:shadow-sm transition-all text-center flex flex-col items-center group'>
            <div className='w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform'>
              <img src={assets.exchange_icon} className='w-6 object-contain' alt="Exchange" />
            </div>
            <p className='font-semibold text-gray-900 text-sm sm:text-base mb-1'>Easy Exchange Policy</p>
            <p className='text-gray-500 text-xs sm:text-sm'>Hassle-free size or color exchange within 7 days.</p>
        </div>
        <div className='bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100/90 hover:border-gray-200 hover:shadow-sm transition-all text-center flex flex-col items-center group'>
            <div className='w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform'>
              <img src={assets.quality_icon} className='w-6 object-contain' alt="Returns" />
            </div>
            <p className='font-semibold text-gray-900 text-sm sm:text-base mb-1'>7 Days Return Guarantee</p>
            <p className='text-gray-500 text-xs sm:text-sm'>Shop with confidence with our money-back guarantee.</p>
        </div>
        <div className='bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100/90 hover:border-gray-200 hover:shadow-sm transition-all text-center flex flex-col items-center group'>
            <div className='w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform'>
              <img src={assets.support_img} className='w-6 object-contain' alt="Support" />
            </div>
            <p className='font-semibold text-gray-900 text-sm sm:text-base mb-1'>Dedicated Support</p>
            <p className='text-gray-500 text-xs sm:text-sm'>Friendly 24/7 customer care ready to assist you anytime.</p>
        </div>
    </div>
  )
}

export default OurPolicy
