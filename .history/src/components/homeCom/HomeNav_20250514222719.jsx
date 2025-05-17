import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSlice";

function HomeNav({ backgroundColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNavigateServices = () => {
    if (userType === "Vendor") {
      navigate("/VendorPage");
    } else if (userType === "Factory") {
      navigate("/FactoryPage");
    } else if (userType === "Charity") {
      navigate("/CharityPage");
    } else {
      navigate("/PublicServicesPage");
    }
  };

  return (
    <>
      <nav
        className={`fixed z-50 ${backgroundColor} top-0 flex justify-around m-auto h-24 lgHome:py-5 minScreen:py-3 minScreen:h-20 w-full font-nunitoBold  minScreen:justify-between minScreen:px-3`}>
        <div className="w-[20%] flex items-center justify-center ">
          <img src="/logo.png" alt="grace cycle" className="w-40" />
        </div>

        <ul className="flex items-center justify-center w-[50%] ml-5 minScreen:hidden lgHome:flex">
          <li className="mr-20">
            <NavLink to="/" className={`text-lg hover:text-lightBrownYellow`}>
              Home
            </NavLink>
          </li>
          <li className="mr-20">
            <button
              onClick={handleNavigateServices}
              className="text-lg hover:text-lightBrownYellow">
              Services
            </button>
          </li>
          <li className="mr-20">
            <NavLink
              to="/about"
              className={`text-lg hover:text-lightBrownYellow`}>
              About us
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              to="/contact"
              className={`text-lg hover:text-lightBrownYellow`}>
              Contact us
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center justify-center gap-3 w-[30%] h-12 minScreen:hidden lgHome:flex">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/userProfile"
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-all">
                <img
                  src="../../public/homeMedia/usericon.png"
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />
              </NavLink>
              <button
                onClick={handleLogout}
                className="font-nunitoBold border-solid border-[#BC0101] border-2 w-[50%] text-[#BC0101] rounded-[11px] hover:bg-[#BC0101] hover:text-white transition-all text-center my-auto py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen
             w-6/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen transition-all text-center my-auto py-2">
                Organization Sign up
              </NavLink>
              <NavLink
                to="/login"
                className="font-nunitoBold border-solid border-btnsGreen border-2 w-6/12
             text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center my-auto py-2">
                Log in
              </NavLink>
            </>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="lgHome:hidden text-3xl focus:outline-none">
          ☰
        </button>
      </nav>

      {isOpen && (
        <div className="absolute -top-10 bottom-0 right-0 bg-[#eeeadfb0] minScreen:flex minScreen:flex-col z-40 lgHome:hidden w-4/12 my-auto">
          <div className="sticky top-40">
            <ul className="flex justify-between flex-col items-center">
              <li>
                <NavLink
                  to="/"
                  className={`text-lg hover:text-lightBrownYellow`}>
                  Home
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleNavigateServices}
                  className="text-lg hover:text-lightBrownYellow">
                  Services
                </button>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={`text-lg hover:text-lightBrownYellow`}>
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={`text-lg hover:text-lightBrownYellow`}>
                  Contact us
                </NavLink>
              </li>
            </ul>

            <div className="flex gap-3 h-12 flex-col my-6 items-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="font-nunitoBold border-solid border-red-500 border-2 w-10 text-red-500 rounded-[11px] hover:bg-red-500 hover:text-white transition-all text-center py-2">
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen w-8/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen transition-all text-center py-2">
                    Organization Sign up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="font-nunitoBold border-solid border-btnsGreen border-2 w-8/12 text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center py-2">
                    Log in
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

HomeNav.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default HomeNav;
