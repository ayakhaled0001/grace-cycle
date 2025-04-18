import { NavLink } from "react-router-dom";
import styles from "../../pages/home/HomePage.module.css";
import PropTypes from "prop-types";
// import { useEffect, useState } from "react";

function HomeNav({ backgroundColor, styles }) {
  return (
    <nav
      className={`fixed z-50 ${backgroundColor} top-0 flex justify-around m-auto h-24 py-7 w-full font-nunitoBold`}>
      <div className="w-2/12">
        <img src="logo.png" alt="grace cycle" className="w-40" />
      </div>
      <ul className="flex justify-between w-4/12 content-center ml-5">
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

      <div className="flex gap-3 w-4/12 h-12">
        <NavLink
          to="/signup"
          className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen
         w-6/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all text-center my-auto py-2">
          Organization Sign up
        </NavLink>
        <NavLink
          to="/login"
          className="font-nunitoBold border-solid border-btnsGreen border-2 w-6/12
         text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center my-auto py-2">
          Log in
        </NavLink>
      </div>
    </nav>
  );
}
HomeNav.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default HomeNav;
