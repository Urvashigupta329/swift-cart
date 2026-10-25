import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='pt-8 border-t border-gray-100'>
      <div className='text-center mb-10'>
        <Title text1={'ABOUT'} text2={'SWIFT CART'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16'>
        <div className='w-full md:max-w-[460px] rounded-3xl overflow-hidden border border-gray-100 shadow-md bg-gray-50 aspect-[4/3] sm:aspect-auto'>
          <img className='w-full h-full object-cover' src={assets.about_img} alt="About Swift Cart" />
        </div>
        <div className='flex flex-col justify-center gap-5 flex-1 text-gray-600 text-sm sm:text-base leading-relaxed'>
          <p>
            <strong className="text-gray-900 font-semibold">Swift Cart</strong> was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of premium products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and apparel to everyday essentials, we offer an extensive collection sourced from trusted creators and suppliers.
          </p>
          <div className="pt-2">
            <h3 className='text-gray-900 font-bold text-lg mb-2'>Our Mission</h3>
            <p>
              Our mission at Swift Cart is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from effortless browsing and secure checkout to speedy delivery and post-purchase care.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-20 mb-8'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        <div className='bg-gray-50/80 rounded-3xl p-8 border border-gray-100/90 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col gap-3 group'>
          <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center font-bold text-gray-900 text-sm">
            01
          </div>
          <h4 className='font-bold text-gray-900 text-base'>Quality Assurance</h4>
          <p className='text-gray-500 text-sm leading-relaxed'>We meticulously select and vet each product to ensure it meets our stringent quality and durability standards.</p>
        </div>
        <div className='bg-gray-50/80 rounded-3xl p-8 border border-gray-100/90 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col gap-3 group'>
          <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center font-bold text-gray-900 text-sm">
            02
          </div>
          <h4 className='font-bold text-gray-900 text-base'>Convenience</h4>
          <p className='text-gray-500 text-sm leading-relaxed'>With our user-friendly interface and hassle-free ordering process, premium shopping has never been easier.</p>
        </div>
        <div className='bg-gray-50/80 rounded-3xl p-8 border border-gray-100/90 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col gap-3 group'>
          <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center font-bold text-gray-900 text-sm">
            03
          </div>
          <h4 className='font-bold text-gray-900 text-base'>Exceptional Service</h4>
          <p className='text-gray-500 text-sm leading-relaxed'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your delight is our priority.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About;
