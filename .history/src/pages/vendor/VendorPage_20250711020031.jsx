import Dashboard from "../../components/vendorCom/Dashboard";
import { Outlet } from "react-router-dom";

const VendorPage = () => {
  return (
    <>
      <div className="">
        <Dashboard />
        <div className="pt-14 sm:pt-0 sm:ml-[250px] lg:ml-[250px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default VendorPage;
