import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]); // Assuming `image` is an array of URLs
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-8 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
        {/* Left Section: Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-24 w-full gap-3 py-1">
            {productData.images.map((item, index) => (
              <button
                type="button"
                onClick={() => setImage(item)}
                key={index}
                className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  image === item ? 'border-black ring-2 ring-black/10 shadow-sm' : 'border-gray-100 hover:border-gray-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={item}
                  className="w-full h-full object-cover object-top"
                  alt={`Thumbnail ${index + 1}`}
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm relative aspect-[3/4] max-h-[580px]">
            <img 
              src={image} 
              className="w-full h-full object-cover object-top" 
              alt="Main Product" 
            />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {productData.category} • {productData.subCategory}
            </span>
            {productData.bestseller && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
                Bestseller
              </span>
            )}
          </div>

          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-tight leading-snug">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1.5 mt-3">
            <div className="flex items-center gap-0.5">
              <img src={assets.star_icon} className="w-4" alt="Star" />
              <img src={assets.star_icon} className="w-4" alt="Star" />
              <img src={assets.star_icon} className="w-4" alt="Star" />
              <img src={assets.star_icon} className="w-4" alt="Star" />
              <img src={assets.star_dull_icon} className="w-4" alt="Dull Star" />
            </div>
            <span className="text-xs font-medium text-gray-500 pl-1.5">(122 verified reviews)</span>
          </div>

          <p className="mt-5 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {currency}{productData.price}
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className="my-6 pt-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-900">Select Size</p>
              <span className="text-xs text-gray-400 font-medium">Standard Fit</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {productData.sizes.map((item, index) => (
                <button
                  type="button"
                  onClick={() => setSize(item)}
                  key={index}
                  className={`min-w-12 h-11 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    item === size
                      ? 'border-black bg-black text-white shadow-sm scale-105'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => addToCart(productData._id, size)} 
              className="w-full sm:w-auto flex-1 bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-gray-800 active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <img src={assets.cart_icon} className="w-4 invert" alt="" />
              <span>ADD TO CART</span>
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>100% Genuine Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>7-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex border-b border-gray-200">
          <button type="button" className="border-b-2 border-black pb-3 px-4 font-semibold text-sm text-gray-900">
            Description
          </button>
          <button type="button" className="pb-3 px-4 font-medium text-sm text-gray-500 hover:text-gray-700">
            Reviews (122)
          </button>
        </div>
        <div className="py-6 text-sm text-gray-600 leading-relaxed flex flex-col gap-3">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
