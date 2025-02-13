import { NavLink } from "react-router-dom";
// import styles from "../../pages/home/HomePage.module.css";
import PropTypes from "prop-types";

function HomeNav({ styles }) {
  return (
    <nav className="flex justify-between m-auto w-11/12 my-4">
      <img src="logo.png" alt="grace cycle" className="w-40" />
      <ul className="flex justify-between w-2/6 content-center">
        <li className="m-auto">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
        </li>
        <li className="m-auto">
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Services
          </NavLink>
        </li>
        <li className="m-auto">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            About us
          </NavLink>
        </li>
        <li className="m-auto">
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Contact us
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-3 w-2/5">
        <button className="font-sans bg-btnsGreen w-5/12 text-white rounded-[15px] px-5">
          Organization Sign up
        </button>
        <button className="font-sans border-solid border-btnsGreen border-2 w-5/12 text-lightBasicGreen rounded-[15px]">
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
