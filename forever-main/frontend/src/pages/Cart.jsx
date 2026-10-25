import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(()=>{
    if(products.length > 0){
      const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          tempData.push({
            _id: items,
            size : item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='pt-8 border-t border-gray-100'>
      <div className='mb-6'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      {cartData.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/60 rounded-3xl border border-dashed border-gray-200 my-8'>
          <div className='w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm'>
            <img src={assets.cart_icon} className='w-7 opacity-40' alt="Empty cart" />
          </div>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-1.5'>Your shopping bag is empty</h3>
          <p className='text-xs sm:text-sm text-gray-500 max-w-sm mb-6 leading-relaxed'>
            Looks like you haven't added anything yet. Discover our latest collections and find something you love.
          </p>
          <button 
            onClick={() => navigate('/collection')}
            className='bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full hover:bg-gray-800 active:scale-95 transition-all shadow-sm'
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-3 my-6'>
            {cartData.map((item, index) => {
              const productData = products.find((product)=> product._id === item._id);
              if (!productData) return null;
              return (
                <div key={index} className='p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-200 transition-all'>
                  <div className='flex items-center gap-4 sm:gap-5 flex-1 min-w-0'>
                    <img src={productData.images[0]} className='w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover object-top border border-gray-100 flex-shrink-0' alt={productData.name} />
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm sm:text-base font-semibold text-gray-900 truncate'>{productData.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-sm'>
                        <span className='font-bold text-gray-900'>{currency}{productData.price}</span>
                        <span className='px-2.5 py-0.5 border border-gray-200 bg-gray-50 text-gray-700 text-xs font-semibold rounded-md'>Size: {item.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pt-2 sm:pt-0 border-t sm:border-none border-gray-100'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-gray-400 font-medium sm:hidden'>Quantity:</span>
                      <input 
                        onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                        className='w-16 text-center border border-gray-200 rounded-xl py-1.5 text-sm font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-gray-50/50' 
                        type="number" 
                        min='1' 
                        defaultValue={item.quantity} 
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={()=> updateQuantity(item._id, item.size, 0)}
                      className='w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors'
                      title="Remove item"
                    >
                      <img src={assets.bin_icon} className='w-4' alt="Delete" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='flex justify-end my-14'>
            <div className='w-full sm:w-[450px] flex flex-col gap-4'>
              <CartTotal/>
              <button 
                onClick={() => navigate('/place-order')} 
                className='w-full bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase py-4 rounded-full hover:bg-gray-800 active:scale-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2'
              >
                <span>PROCEED TO CHECKOUT</span>
                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;
