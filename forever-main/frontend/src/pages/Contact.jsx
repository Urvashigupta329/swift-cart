import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='pt-8 border-t border-gray-100'>
      <div className='text-center mb-10'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-14 mb-24'>
        <div className='w-full md:max-w-[460px] rounded-3xl overflow-hidden border border-gray-100 shadow-md bg-gray-50 aspect-[4/3] sm:aspect-auto'>
          <img className='w-full h-full object-cover' src={assets.contact_img} alt="Contact Swift Cart" />
        </div>

        <div className='flex flex-col justify-center items-start gap-6 flex-1 max-w-xl'>
          <div className='w-full bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-100/90 shadow-sm'>
            <span className='inline-block text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full mb-3'>
              Headquarters
            </span>
            <h3 className='font-bold text-lg text-gray-900 mb-2'>Our Flagship Store</h3>
            <p className='text-gray-600 text-sm leading-relaxed mb-4'>
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <div className='text-sm text-gray-600 flex flex-col gap-1 border-t border-gray-200/70 pt-3'>
              <p><span className='text-gray-400'>Tel:</span> (415) 555-0132</p>
              <p><span className='text-gray-400'>Email:</span> admin@forever.com</p>
            </div>
          </div>

          <div className='w-full bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-100/90 shadow-sm'>
            <span className='inline-block text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full mb-3'>
              Opportunities
            </span>
            <h3 className='font-bold text-lg text-gray-900 mb-1'>Careers at Swift Cart</h3>
            <p className='text-gray-600 text-sm leading-relaxed mb-5'>
              Learn more about our distributed teams, creative culture, and open job roles.
            </p>
            <button className='bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3 rounded-full hover:bg-gray-800 active:scale-95 transition-all shadow-sm'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact;
