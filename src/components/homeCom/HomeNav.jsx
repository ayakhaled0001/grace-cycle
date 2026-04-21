import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { Link } from "react-router-dom";
import { fetchUserCart } from "../../redux/FoodSlice";
import Swal from "sweetalert2";

function HomeNav({ backgroundColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // صورة البروفايل من localStorage
  const [profileAvatar, setProfileAvatar] = useState(null);
  useEffect(() => {
    const savedAvatar = localStorage.getItem("charityProfileAvatar");
    if (savedAvatar) setProfileAvatar(savedAvatar);
  }, []);

  // ترحيب بعد تسجيل الدخول
  useEffect(() => {
    let intervalId;
    if (sessionStorage.getItem("showWelcomeAfterLogin")) {
      intervalId = setInterval(() => {
        if (localStorage.getItem("token")) {
          Swal.fire({
            icon: "success",
            title: "Welcome back!",
            text: "Glad to see you again!",
            timer: 2000,
            showConfirmButton: false,
          });
          sessionStorage.removeItem("showWelcomeAfterLogin");
          clearInterval(intervalId);
        }
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, []);

  // Get cart items count from redux
  const cart = useSelector((state) => state.servicesFood.cart || []);
  // Count unique vendors/restaurants in cart (same as CartPage logic)
  const cartCount = Array.isArray(cart) ? cart.length : 0;

  const toggleMenu = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const isLoggedIn = Boolean(token);

  // Fetch cart data on component mount
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserCart());
    }
  }, [dispatch, isLoggedIn]);

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
        className={`sticky z-50 ${backgroundColor} top-0 flex items-center justify-between m-auto px-3 sm:px-4 h-16 sm:h-20 lgHome:h-24 w-full font-nunitoBold`}
      >
        <div className="w-auto flex items-center justify-center">
          <img src="/logo.png" alt="grace cycle" className="w-40" />
        </div>

        <ul className="w-[50%] flex items-center justify-end ml-5 minScreen:hidden lgHome:flex">
          <li className="mr-20">
            <NavLink to="/" className={`text-lg hover:text-lightBrownYellow`}>
              Home
            </NavLink>
          </li>
          <li className="mr-20">
            <button
              onClick={handleNavigateServices}
              className="text-lg hover:text-lightBrownYellow"
            >
              Services
            </button>
          </li>
          <li className="mr-20">
            <NavLink
              to="/about"
              className={`text-lg hover:text-lightBrownYellow`}
            >
              About us
            </NavLink>
          </li>
          <li className="mr-20">
            <NavLink
              to="/contact"
              className={`text-lg hover:text-lightBrownYellow`}
            >
              Contact us
            </NavLink>
          </li>
        </ul>

        <div className="w-[30%] flex items-center justify-center gap-3 h-12 minScreen:hidden lgHome:flex">
          {isLoggedIn ? (
            <>
              <button
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-all"
                onClick={() => {
                  if (userType === "Vendor") {
                    navigate("/VendorPage/settings");
                  } else {
                    navigate("/charityProfile");
                  }
                }}
                style={{ border: "none", background: "none", padding: 0 }}
              >
                <img
                  src={profileAvatar || "../../homeMedia/usericon.png"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>
              {userType !== "Vendor" && (
                <Link
                  to="/CharityPage/cart"
                  className="flex items-center justify-center border border-lightGrey rounded-xl p-2 h-10 w-full sm:w-[10%] bg-btnsGreen text-white cursor-pointer hover:bg-green-900 transition-colors"
                >
                  <div
                    style={{
                      position: "relative",
                      width: "22px",
                      height: "22px",
                    }}
                  >
                    <img src="/icons/cart.svg" alt="cart icon" width={"22"} />
                    {cartCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-15px",
                          right: "-18px",
                          background: "#BC0101",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          zIndex: 2,
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              )}
              {/* زر Logout تم حذفه */}
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen
             w-6/12 text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen transition-all text-center my-auto py-2"
              >
                Organization Sign up
              </NavLink>
              <NavLink
                to="/login"
                className="font-nunitoBold border-solid border-btnsGreen border-2 w-6/12
             text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center my-auto py-2"
                onClick={() =>
                  sessionStorage.setItem("showWelcomeAfterLogin", "1")
                }
              >
                Log in
              </NavLink>
            </>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="lgHome:hidden text-3xl focus:outline-none leading-none"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lgHome:hidden" onClick={toggleMenu}>
          <div
            className="absolute right-0 top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-10/12 max-w-sm bg-[#eeeadf] p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex justify-between flex-col items-start gap-4">
              <li>
                <NavLink
                  to="/"
                  className={`text-lg hover:text-lightBrownYellow`}
                  onClick={toggleMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleNavigateServices}
                  className="text-lg hover:text-lightBrownYellow"
                >
                  Services
                </button>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={`text-lg hover:text-lightBrownYellow`}
                  onClick={toggleMenu}
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={`text-lg hover:text-lightBrownYellow`}
                  onClick={toggleMenu}
                >
                  Contact us
                </NavLink>
              </li>
            </ul>

            <div className="flex gap-3 flex-col my-6 items-start">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="font-nunitoBold border-solid border-red-500 border-2 w-full text-red-500 rounded-[11px] hover:bg-red-500 hover:text-white transition-all text-center py-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className="font-nunitoBold border-solid border-btnsGreen border-2 bg-btnsGreen w-full text-white rounded-[11px] hover:bg-transparent hover:text-btnsGreen transition-all text-center py-2"
                    onClick={toggleMenu}
                  >
                    Organization Sign up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="font-nunitoBold border-solid border-btnsGreen border-2 w-full text-lightBasicGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center py-2"
                    onClick={toggleMenu}
                  >
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

