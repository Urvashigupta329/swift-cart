import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); 

  // Ensure `image` is an array and has at least one element
  const productImage = Array.isArray(image) && image.length > 0 ? image[0] : "placeholder.jpg";

  return (
    <Link 
      className='group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200/80 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300'
      to={id ? `/product/${id}` : '#'}
    >
      <div className='aspect-[3/4] w-full overflow-hidden bg-gray-50 relative'>
        <img 
          className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out' 
          src={productImage} 
          alt={name || "Product"} 
          loading="lazy"
        />
        <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3'>
          <span className='bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium px-3.5 py-1.5 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
            View Details
          </span>
        </div>
      </div>
      <div className='p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-1'>
        <p className='text-xs sm:text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition-colors' title={name}>
          {name || "No Name"}
        </p>
        <div className='flex items-center justify-between mt-1'>
          <p className='text-sm sm:text-base font-semibold text-gray-900'>
            {currency ? currency + price : "Price Not Available"}
          </p>
          <span className='text-[11px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors'>
            In Stock
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
