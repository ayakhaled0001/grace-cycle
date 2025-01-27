import React from "react";
import Wavehand from '../../assets/icons/Wavehand.svg'

const Header = () => {
  return (
    <div className="h-32 flex justify-center items-center mx-auto">
      <h3 className="text-[24px] font-bold inline-block font-nunitoBold">
        Welcome again
      </h3>
      <span className="ml-2">
       <img src={Wavehand} alt="" />
      </span>
    </div>
  );
};

export default Header;
