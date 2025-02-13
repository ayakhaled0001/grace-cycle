import { NavLink } from "react-router-dom";
// import styles from "../../pages/home/HomePage.module.css";
import PropTypes from "prop-types";

function HomeNav({ styles }) {
  return (
    <nav className="flex justify-between m-auto w-11/12">
      <img src="logo.png" alt="grace cycle" width={180} />
      <ul className="flex justify-between w-3/12">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            About us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Contact us
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-3 w-1/4">
        <button className="font-sans bg-btnsGreen w-6/12">
          Organization Sign up
        </button>
        <button className="font-sans border-solid border-btnsGreen border-2 w-6/12">
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
