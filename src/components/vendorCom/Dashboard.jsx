import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activePage, setActivePage] = React.useState("Overview");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page, path) => {
    setActivePage(page);
    navigate(path);
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      {/* Navbar for small screens */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#EBE8DB] shadow-lg flex justify-between items-center p-4 z-50">
        <h2 className="text-xl font-nunitoBold">{activePage}</h2>
        <button onClick={toggleMenu} className="focus:outline-none text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#EBE8DB] font-nunitoBold shadow-lg flex flex-col items-center pt-14
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0 sm:w-1/5  lg:w-1/5 lg:hover:w-[16%] transition-all duration-300 z-40`}
      >
        <h2 className="sidebar-header text-xl font-bold p-4">Dashboard</h2>
        <ul className="sidebar-menu space-y-4 p-4 w-full">
          <li onClick={() => handleMenuClick("Overview", "/VendorPage/overview")}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300">
              <img src="../../../public/DashboardIcons/vector1.svg" className="w-6" alt="Overview" />
              <span>Overview</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("Add New Item", "/VendorPage/addNewItem")}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300">
              <img src="../../../public/DashboardIcons/vector2.svg" className="w-6" alt="Add" />
              <span>Add New Item</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("My Listings", "/VendorPage/myListings")}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300">
              <img src="../../../public/DashboardIcons/vector3.svg" className="w-6" alt="Listings" />
              <span>My Listings</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("Orders", "/VendorPage/orders")}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300">
              <img src="../../../public/DashboardIcons/vector4.svg" className="w-6" alt="Orders" />
              <span>Orders</span>
            </div>
          </li>
          <hr className="border-t my-4" />
          <li onClick={() => handleMenuClick("Settings", "/VendorPage/settings")}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300">
              <img src="../../../public/DashboardIcons/vector5.svg" className="w-6" alt="Settings" />
              <span>Settings</span>
            </div>
          </li>
          <li onClick={handleLogout}>
            <div className="flex items-center space-x-2 px-6 py-2 hover:bg-[#C1BFB3] cursor-pointer transition-all duration-300">
              <img src="../../../public/DashboardIcons/vector6.svg" className="w-6" alt="Logout" />
              <span>Logout</span>
            </div>
          </li>
          <li onClick={() => handleMenuClick("Home", "/")}>
            <div className="flex items-center px-6 py-2 pt-4 cursor-pointer">
              <img src="../../../public/logo.png" alt="Logo" style={{ width: "120px" }} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
