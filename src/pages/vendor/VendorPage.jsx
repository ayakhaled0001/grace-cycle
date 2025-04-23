import React from "react";
import Dashboard from "../../components/vendorCom/Dashboard";
import { Outlet } from "react-router-dom";

const VendorPage = () => {
  return (
    <div className="flex flex-1">
      <Dashboard />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorPage;
