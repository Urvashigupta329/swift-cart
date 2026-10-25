import React from 'react' 
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => { 
    return ( 
        <div className='flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-100 bg-gradient-to-br from-neutral-50 via-stone-50 to-neutral-100 shadow-sm relative my-6'> 
            {/* Hero Left Side */} 
            <div className='w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16'> 
                <div className='flex flex-col items-start'> 
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 text-white text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-sm'> 
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
                        OUR BESTSELLERS
                    </div> 
                    <h1 className='prata-regular text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-3'>
                      Latest Arrivals
                    </h1>
                    <p className='text-gray-600 text-xs sm:text-sm md:text-base max-w-md mb-6 leading-relaxed'>
                      Discover timeless fashion designed for modern lifestyles. Premium fabrics, versatile cuts, and effortless everyday comfort.
                    </p>
                    <Link 
                      to='/collection'
                      className='inline-flex items-center gap-3 bg-black text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-gray-800 active:scale-95 transition-all shadow-md hover:shadow-lg'
                    >
                      <span>EXPLORE COLLECTION</span>
                      <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                </div> 
            </div> 
            {/* Hero Right Side */}
            <div className='w-full sm:w-1/2 relative overflow-hidden bg-gray-100'>
              <img 
                className='w-full h-full object-cover object-center max-h-[500px]' 
                src={assets.hero_img} 
                alt="Latest Arrivals Collection" 
              />
            </div>
        </div> 
    ) 
} 
export default Hero