import { NavLink } from "react-router-dom";
// import styles from "../../pages/home/HomePage.module.css";
import PropTypes from "prop-types";

function HomeNav() {
  return (
    <nav className="flex justify-between m-auto w-11/12 py-7">
      <div className="w-2/12">
        <img src="logo.png" alt="grace cycle" className="w-41" />
      </div>
      <ul className="flex justify-between w-4/12 content-center ml-5">
        <li className="m-auto">
          <NavLink to="/" className={`text-lg`}>
            Home
          </NavLink>
        </li>
        <li className="m-auto">
          <NavLink to="/services" className={`text-lg`}>
            Services
          </NavLink>
        </li>
        <li className="m-auto">
          <NavLink to="/about" className={`text-lg`}>
            About us
          </NavLink>
        </li>
        <li className="m-auto">
          <NavLink to="/contact" className={`text-lg`}>
            Contact us
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-3 w-4/12 h-12">
        <button
          className="font-sans border-solid border-btnsGreen border-2 bg-btnsGreen
         w-6/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen  transition-all">
          Organization Sign up
        </button>
        <button
          className="font-sans border-solid border-btnsGreen border-2 w-6/12
         text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all">
          Log in
        </button>
      </div>
    </nav>
  );
}
HomeNav.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default HomeNav;
