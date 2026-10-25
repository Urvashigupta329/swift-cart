import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext (ShopContext); 
    const [bestSeller, setBestSeller] = useState([]); 
    useEffect(()=>{ 
        const bestProduct = products.filter((item)=>(item.bestseller)); 
        setBestSeller (bestProduct.slice(0,5)) 
    }, [products]) 
  return (
    <section className='my-16'>
      <div className='text-center max-w-xl mx-auto mb-10'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='text-xs sm:text-sm text-gray-500 leading-relaxed'>
          Our most-loved pieces, praised by thousands of satisfied customers for exceptional fit, comfort, and enduring style.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {bestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
        ))}
      </div>
    </section>
  )
}

export default BestSeller
