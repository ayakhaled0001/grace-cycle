import React from "react";
import Dashboard from "../../components/vendorCom/Dashboard";
import { Outlet } from "react-router-dom";
import HomeNav from "../../components/homeCom/HomeNav";
const VendorPage = () => {
  return (
    <div className="min-h-screen">
      <HomeNav />
      <Dashboard />
      <div className="pt-14 sm:pt-0 sm:ml-[250px] lg:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorPage;
