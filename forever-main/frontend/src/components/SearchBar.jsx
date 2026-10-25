import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes('collection') && showSearch){
      setVisible(true);
    }
    else{
      setVisible(false);
    }
  }, [location])

  return showSearch && visible ? (
    <div className="border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm text-center py-4 px-4 transition-all animate-fadeIn">
      <div className="inline-flex items-center justify-between border border-gray-200 bg-white px-5 py-2.5 rounded-full w-full max-w-xl shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400"
          type="text"
          placeholder="Search through products, collections, styles..."
          autoFocus
        />
        <img className="w-4 ml-3 opacity-60" src={assets.search_icon} alt="Search" />
      </div>
      <button
        onClick={() => setShowSearch(false)}
        className="inline-flex items-center justify-center w-8 h-8 ml-3 rounded-full hover:bg-gray-200/70 transition-colors"
        title="Close search"
      >
        <img className="w-3" src={assets.cross_icon} alt="Close" />
      </button>
    </div>
  ) : null;
};

export default SearchBar;
