import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory || item.subcategory))
    }
    if(sortType === 'low-high'){
      productsCopy.sort((a,b)=>(a.price-b.price));
    }
    else if(sortType === 'high-low'){
      productsCopy.sort((a,b)=>(b.price-a.price));
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(()=>{
    applyFilter();
  }, [category, subCategory, search, showSearch, products])
  useEffect(()=>{
    sortProduct();
  }, [sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-6 lg:gap-10 pt-8 border-t border-gray-100'>
      {/*Filter options */}
      <div className='min-w-60 sm:w-64 flex-shrink-0'> 
        <div 
          onClick={()=>setShowFilter(!showFilter)} 
          className='my-2 flex items-center justify-between cursor-pointer sm:cursor-default py-2.5 px-4 bg-gray-50 sm:bg-transparent rounded-xl border sm:border-none border-gray-200'
        >
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-900 text-sm tracking-wider uppercase'>Filters</span>
            {(category.length > 0 || subCategory.length > 0) && (
              <span className='w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center'>
                {category.length + subCategory.length}
              </span>
            )}
          </div>
          <img className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </div>

        {/* Category Filter */} 
        <div className={`bg-white border border-gray-200/80 rounded-2xl p-5 mt-4 shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}> 
          <div className='flex items-center justify-between mb-3.5 pb-2 border-b border-gray-100'>
            <p className='text-xs font-bold text-gray-900 tracking-wider uppercase'>Categories</p>
            {category.length > 0 && (
              <span className='text-[11px] font-medium text-gray-400'>
                {category.length} selected
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2.5 text-sm text-gray-600'>
            <label className='flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors'>
              <input className='w-4 h-4 accent-black rounded cursor-pointer' type="checkbox" onChange={toggleCategory} value={'Men'} checked={category.includes('Men')}/>
              <span>Men</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors'>
              <input className='w-4 h-4 accent-black rounded cursor-pointer' type="checkbox" onChange={toggleCategory} value={'Women'} checked={category.includes('Women')}/>
              <span>Women</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors'>
              <input className='w-4 h-4 accent-black rounded cursor-pointer' type="checkbox" onChange={toggleCategory} value={'Kids'} checked={category.includes('Kids')}/>
              <span>Kids</span>
            </label>
          </div>
        </div>

        {/* Subcategory / Type filters */}
        <div className={`bg-white border border-gray-200/80 rounded-2xl p-5 mt-4 shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}> 
          <div className='flex items-center justify-between mb-3.5 pb-2 border-b border-gray-100'>
            <p className='text-xs font-bold text-gray-900 tracking-wider uppercase'>Type</p>
            {subCategory.length > 0 && (
              <span className='text-[11px] font-medium text-gray-400'>
                {subCategory.length} selected
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2.5 text-sm text-gray-600'>
            <label className='flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors'>
              <input className='w-4 h-4 accent-black rounded cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Topwear'} checked={subCategory.includes('Topwear')}/>
              <span>Topwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors'>
              <input className='w-4 h-4 accent-black rounded cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'} checked={subCategory.includes('Bottomwear')}/>
              <span>Bottomwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer select-none hover:text-black transition-colors'>
              <input className='w-4 h-4 accent-black rounded cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Winterwear'} checked={subCategory.includes('Winterwear')}/>
              <span>Winterwear</span>
            </label>
          </div>
        </div>
      </div>

      {/*Right side */}
      <div className='flex-1 min-w-0'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100'>
          <div className='flex items-baseline gap-2'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <span className='text-xs sm:text-sm text-gray-400 font-normal'>
              ({filterProducts.length} {filterProducts.length === 1 ? 'item' : 'items'})
            </span>
          </div>

          {/*Product sort */}
          <div className='flex items-center gap-2'>
            <label htmlFor="sort-select" className="text-xs text-gray-500 hidden sm:inline">Sort by:</label>
            <select 
              id="sort-select"
              onChange={(e)=>setSortType(e.target.value)} 
              value={sortType}
              className="bg-white border border-gray-200 text-xs sm:text-sm font-medium rounded-xl px-3.5 py-2 outline-none shadow-sm focus:border-black cursor-pointer hover:border-gray-300 transition-colors" 
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/*Map Products */}
        {filterProducts.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/60 rounded-3xl border border-dashed border-gray-200'>
            <div className='w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 shadow-sm'>
              <img src={assets.search_icon} className='w-5 opacity-40' alt="" />
            </div>
            <p className='text-base font-semibold text-gray-900 mb-1'>No products match your filters</p>
            <p className='text-xs sm:text-sm text-gray-500 max-w-sm mb-4'>Try unchecking some filters or search for something else.</p>
            {(category.length > 0 || subCategory.length > 0) && (
              <button 
                onClick={() => { setCategory([]); setSubCategory([]); }}
                className='text-xs font-semibold px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors'
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.images} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection;
