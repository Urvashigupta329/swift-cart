import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Only accessing the necessary value
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]); // Ensure that you re-fetch products if they change

  return (
    <section className='my-16'>
      <div className='text-center max-w-xl mx-auto mb-10'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='text-xs sm:text-sm text-gray-500 leading-relaxed'>
          Explore our freshest arrivals, thoughtfully designed with premium tailoring and versatile modern aesthetics.
        </p>
      </div>
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
