import React from "react";
import Wavehand from '../../assets/icons/Wavehand.svg'

const Header = () => {
  return (
    <div className="h-24 sm:h-28 lg:h-32 flex justify-center items-center mx-auto">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold inline-block font-nunitoBold">
        Welcome again
      </h3>
      <span className="ml-2">
       <img src={Wavehand} alt="" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
      </span>
    </div>
  );
};

export default Header;
