import { NavLink } from "react-router-dom";
// import styles from "../../pages/home/HomePage.module.css";
import PropTypes from "prop-types";

function HomeNav(styles) {
  return (
    <nav className="flex justify-between m-auto w-11/12">
      <img src="logo.png" alt="grace cycle" width={180} />
      <ul className="flex justify-between w-3/12">
        <li>
          <NavLink to="/" ClassName={({ isActive }) => (isActive ? {} : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="">Services</NavLink>
        </li>
        <li>
          <NavLink to="">About us</NavLink>
        </li>
        <li>
          <NavLink to="">Contact us</NavLink>
        </li>
      </ul>

      <div className="">
        <button></button>
        <button></button>
      </div>
    </nav>
  );
}
HomeNav.propTypes = {
  styles: PropTypes.object,
};

export default HomeNav;
