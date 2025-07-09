import DishInfo from "../../components/charityCom/cartCom/DishInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendors } from "../../redux/VendorSlice";
import { Skeleton } from "@mui/material";
import HomeFooter from "../../components/homeCom/HomeFooter";

export default function VendorDetails() {
  const { vendorName } = useParams();
  const dispatch = useDispatch();
  const { vendors, isLoading, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(getVendors());
  }, [dispatch]);

  // Find the vendor by displayName (case-insensitive)
  const vendor = vendors.find(
    (v) => v.displayName.toLowerCase() === vendorName?.toLowerCase()
  );

  if (isLoading) {
    return (
      <>
        <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
          <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
            {/* Image Skeleton */}
            <div className="w-full lg:w-5/12 flex justify-center">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={320}
                className="rounded-md"
              />
            </div>
            {/* Info Skeleton */}
            <div className="w-full lg:w-5/12 space-y-4">
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="80%" height={60} />
              <Skeleton variant="text" width="40%" height={30} />
              <Skeleton variant="text" width="70%" height={30} />
              <Skeleton variant="text" width="90%" height={100} />
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Error Loading Vendor
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }

  if (!vendor) {
    return (
      <>
        <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Vendor Not Found
            </h2>
            <p className="text-gray-600">
              The vendor &quot;{vendorName}&quot; could not be found.
            </p>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }

  return (
    <>
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <DishInfo
          itemId="1"
          itemType="dish"
          showShoppingCart={false}
          vendorData={vendor}
          isVendorPage={true}
        />
      </div>
      <HomeFooter />
    </>
  );
}
