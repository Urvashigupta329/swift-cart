import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='border-t border-gray-100 mt-28 pt-16 pb-8'>
      <div className='flex flex-col sm:grid grid-cols-[2.5fr_1fr_1fr] gap-10 lg:gap-14 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32 sm:w-36' alt="Swift Cart" />
          <p className='w-full md:w-4/5 text-gray-500 text-sm leading-relaxed'>
            Swift Cart is your premier destination for contemporary fashion, curated apparel, and everyday lifestyle essentials delivered with seamless speed and exceptional care.
          </p>
        </div>
        <div>
          <p className='text-xs font-bold uppercase tracking-wider text-gray-900 mb-4'>Company</p>
          <ul className='flex flex-col gap-2.5 text-gray-500 text-sm'>
            <li className='hover:text-black transition-colors cursor-pointer'>Home</li>
            <li className='hover:text-black transition-colors cursor-pointer'>About Us</li>
            <li className='hover:text-black transition-colors cursor-pointer'>Delivery Information</li>
            <li className='hover:text-black transition-colors cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xs font-bold uppercase tracking-wider text-gray-900 mb-4'>Get In Touch</p>
          <ul className='flex flex-col gap-2.5 text-gray-500 text-sm'>
            <li>+1-212-456-7890</li>
            <li>contact@swiftcart.com</li>
            <li className='text-xs text-gray-400 pt-1'>Mon - Fri: 9am - 6pm EST</li>
          </ul>
        </div>
      </div>

      <div className='mt-14 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3'>
        <p>Copyright 2024@ swiftcart.com - All rights reserved.</p>
        <div className='flex items-center gap-4'>
          <span className='hover:text-gray-600 transition-colors cursor-pointer'>Terms of Service</span>
          <span>•</span>
          <span className='hover:text-gray-600 transition-colors cursor-pointer'>Privacy Policy</span>
          <span>•</span>
          <span className='hover:text-gray-600 transition-colors cursor-pointer'>Cookies</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
