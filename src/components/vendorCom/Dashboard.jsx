import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if (
      location.pathname === "/VendorPage" ||
      location.pathname === "/VendorPage/"
    ) {
      navigate("/VendorPage/addNewItem", { replace: true });
    }
  }, [location, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#225A4A",
      cancelButtonColor: "#BC0101",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      dispatch(logout());
      navigate("/");
      if (window.innerWidth < 640) {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <div>
      {/* Navbar for small screens */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#EBE8DB] shadow-lg flex justify-between items-center p-4 z-50">
        <h2 className="text-xl font-nunitoBold">
          {location.pathname.split("/").pop()}
        </h2>
        <button onClick={toggleMenu} className="focus:outline-none text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:fixed top-0 left-0 h-full bg-[#EBE8DB] font-nunitoBold shadow-lg flex flex-col items-center pt-14
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:w-[250px] lg:w-[250px] transition-all duration-300 z-40`}
      >
        <h2 className="sidebar-header text-xl font-bold p-4">Dashboard</h2>
        <ul className="sidebar-menu space-y-4 p-4 w-full">
          <li onClick={() => handleMenuClick("/VendorPage/addNewItem")}>
            <div
              className={`flex items-center space-x-2 px-6 py-2 ${
                location.pathname === "/VendorPage/addNewItem"
                  ? "bg-[#C1BFB3]"
                  : "hover:bg-[#C1BFB3]"
              } cursor-pointer transition-all duration-300`}
            >
              <img
                src="../../../public/DashboardIcons/vector2.svg"
                className="w-6"
                alt="Add"
              />
              <span>Add New Item</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("/VendorPage/myListings")}>
            <div
              className={`flex items-center space-x-2 px-6 py-2 ${
                location.pathname === "/VendorPage/myListings"
                  ? "bg-[#C1BFB3]"
                  : "hover:bg-[#C1BFB3]"
              } cursor-pointer transition-all duration-300`}
            >
              <img
                src="../../../public/DashboardIcons/vector3.svg"
                className="w-6"
                alt="Listings"
              />
              <span>My Listings</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("/VendorPage/orders")}>
            <div
              className={`flex items-center space-x-2 px-6 py-2 ${
                location.pathname === "/VendorPage/orders"
                  ? "bg-[#C1BFB3]"
                  : "hover:bg-[#C1BFB3]"
              } cursor-pointer transition-all duration-300`}
            >
              <img
                src="../../../public/DashboardIcons/vector4.svg"
                className="w-6"
                alt="Orders"
              />
              <span>Orders</span>
            </div>
          </li>
          <hr className="border-t my-4" />
          <li onClick={() => handleMenuClick("/VendorPage/settings")}>
            <div
              className={`flex items-center space-x-2 px-6 py-2 ${
                location.pathname === "/VendorPage/settings"
                  ? "bg-[#C1BFB3]"
                  : "hover:bg-[#C1BFB3]"
              } cursor-pointer transition-all duration-300`}
            >
              <img
                src="../../../public/DashboardIcons/vector5.svg"
                className="w-6"
                alt="Settings"
              />
              <span>Settings</span>
            </div>
          </li>
          <li onClick={handleLogout}>
            <div
              className={`flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300`}
            >
              <img
                src="../../../public/DashboardIcons/vector6.svg"
                className="w-6"
                alt="Logout"
              />
              <span>Logout</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("/")}>
            <div className="flex items-center px-6 py-2 pt-4 cursor-pointer">
              <img
                src="../../../public/logo.png"
                alt="Logo"
                style={{ width: "120px" }}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
