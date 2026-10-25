import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const logout = () => {
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }
  return (
    <nav className="flex items-center justify-between py-4 font-medium border-b border-gray-100/90 relative">
      {/* Logo */}
      <Link to='/' className="flex items-center">
        <img src={assets.logo} className="w-32 sm:w-36 transition-opacity hover:opacity-90" alt="Swift Cart" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium tracking-wide text-gray-700">
        <li>
          <NavLink to="/" className={({isActive}) => `px-3.5 py-1.5 rounded-full transition-all flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : 'hover:text-black hover:bg-gray-50'}`}>
            <span>HOME</span>
            <hr className="w-4 border-none h-0.5 bg-black rounded-full" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection" className={({isActive}) => `px-3.5 py-1.5 rounded-full transition-all flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : 'hover:text-black hover:bg-gray-50'}`}>
            <span>COLLECTION</span>
            <hr className="w-4 border-none h-0.5 bg-black rounded-full" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({isActive}) => `px-3.5 py-1.5 rounded-full transition-all flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : 'hover:text-black hover:bg-gray-50'}`}>
            <span>ABOUT</span>
            <hr className="w-4 border-none h-0.5 bg-black rounded-full" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({isActive}) => `px-3.5 py-1.5 rounded-full transition-all flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : 'hover:text-black hover:bg-gray-50'}`}>
            <span>CONTACT</span>
            <hr className="w-4 border-none h-0.5 bg-black rounded-full" />
          </NavLink>
        </li>
      </ul>

      {/* Profile and Cart */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={() => setShowSearch(true)} 
          className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors"
          title="Search products"
        >
          <img src={assets.search_icon} className="w-4 sm:w-5" alt="Search" />
        </button>

        <div className="group relative">
          <button 
            onClick={() => token ? null : navigate('/login')} 
            className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors"
            title={token ? "Account menu" : "Login"}
          >
            <img className="w-4 sm:w-5" src={assets.profile_icon} alt="Profile" />
          </button>
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-2 z-50">
              <div className="flex flex-col gap-1 w-44 p-2 bg-white text-gray-700 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
                <p className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">My Account</p>
                <p onClick={()=> navigate('/orders')} className="cursor-pointer px-3 py-2 text-xs sm:text-sm rounded-xl hover:bg-gray-50 hover:text-black transition-colors font-medium">Orders</p>
                <p onClick={logout} className="cursor-pointer px-3 py-2 text-xs sm:text-sm rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors" title="Shopping Cart">
          <img src={assets.cart_icon} className="w-4 sm:w-5" alt="Cart" />
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 text-center flex items-center justify-center bg-black text-white rounded-full text-[10px] font-bold shadow-sm">
            {getCartCount()}
          </span>
        </Link>

        <button 
          onClick={()=>setVisible(true)} 
          className='p-2.5 rounded-full hover:bg-gray-100 transition-colors sm:hidden'
          aria-label="Open menu"
        >
          <img src={assets.menu_icon} className='w-5' alt="Menu" />
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {visible && (
        <div 
          onClick={() => setVisible(false)} 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 sm:hidden transition-opacity" 
        />
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white shadow-2xl transition-all duration-300 sm:hidden flex flex-col ${visible ? 'w-3/4 max-w-xs p-6' : 'w-0 overflow-hidden p-0'}`}>
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <p className="font-semibold text-gray-800 text-sm tracking-wider uppercase">Menu</p>
          <button 
            onClick={() => setVisible(false)} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img src={assets.cross_icon} className="w-3.5" alt="Close" />
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4 text-gray-700 font-medium">
          <NavLink onClick={()=>setVisible(false)} className={({isActive}) => `py-3 px-4 rounded-xl transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-50'}`} to="/">HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className={({isActive}) => `py-3 px-4 rounded-xl transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-50'}`} to="/collection">COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className={({isActive}) => `py-3 px-4 rounded-xl transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-50'}`} to="/about">ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className={({isActive}) => `py-3 px-4 rounded-xl transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-50'}`} to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
