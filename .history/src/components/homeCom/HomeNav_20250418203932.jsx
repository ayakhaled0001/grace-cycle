import { NavLink } from "react-router-dom";
import styles from "../../pages/home/HomePage.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function HomeNav({ backgroundColor }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <nav
        className={`fixed z-50 ${backgroundColor} top-0 flex justify-around m-auto h-24 py-5 w-full font-nunitoBold  minScreen:justify-between minScreen:px-3`}>
        <div className="w-2/12">
          <img src="logo.png" alt="grace cycle" className="w-40" />
        </div>
        <ul className="flex justify-between w-4/12 content-center ml-5 minScreen:hidden lgHome:flex">
          <li className="m-auto">
            <NavLink to="/" className={`text-lg hover:text-lightBrownYellow`}>
              Home
            </NavLink>
          </li>
          <li className="m-auto">
            <NavLink
              to="/services"
              className={`text-lg hover:text-lightBrownYellow`}>
              Services
            </NavLink>
          </li>
          <li className="m-auto">
            <NavLink
              to="/about"
              className={`text-lg hover:text-lightBrownYellow`}>
              About us
            </NavLink>
          </li>
          <li className="m-auto">
            <NavLink
              to="/contact"
              className={`text-lg hover:text-lightBrownYellow`}>
              Contact us
            </NavLink>
          </li>
        </ul>

        <div className="flex gap-3 w-4/12 h-12 minScreen:hidden lgHome:flex">
          <NavLink
            to="/signup"
            className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen
         w-6/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all text-center my-auto py-2">
            Organization Sign up
          </NavLink>
          <NavLink
            to="/login"
            className="font-nunitoBold border-solid border-btnsGreen border-2 w-6/12
         text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center my-auto py-2
         
         ">
            Log in
          </NavLink>
        </div>
        {/* responsive menu */}
        <button
          onClick={toggleMenu}
          className="lgHome:hidden text-3xl focus:outline-none">
          ☰
        </button>
      </nav>
      {isOpen && (
        <div className="absolute top-0 bottom-0 right-0 bg-[#fffcf6c0] minScreen:flex minScreen:flex-col z-40 lgHome:hidden ">
          <ul className="flex justify-between w-6/12 content-center ml-5 flex-col">
            <li className="">
              <NavLink to="/" className={`text-lg hover:text-lightBrownYellow`}>
                Home
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/services"
                className={`text-lg hover:text-lightBrownYellow`}>
                Services
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/about"
                className={`text-lg hover:text-lightBrownYellow`}>
                About us
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/contact"
                className={`text-lg hover:text-lightBrownYellow`}>
                Contact us
              </NavLink>
            </li>
          </ul>
          <div className="flex gap-3 w-4/12 h-12 minScreen:flex-col">
            <NavLink
              to="/signup"
              className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen
         w-6/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all text-center my-auto py-2">
              Organization Sign up
            </NavLink>
            <NavLink
              to="/login"
              className="font-nunitoBold border-solid border-btnsGreen border-2 w-6/12
         text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center my-auto py-2
         ">
              Log in
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
HomeNav.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default HomeNav;
