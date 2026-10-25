import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-3">
      <h2 className="text-gray-500 font-normal tracking-wider uppercase text-lg sm:text-xl md:text-2xl">
        {text1} <span className="text-gray-900 font-semibold">{text2}</span>
      </h2>
      <span className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-gray-900 to-gray-400 rounded-full inline-block"></span>
    </div>
  );
};

export default Title;
