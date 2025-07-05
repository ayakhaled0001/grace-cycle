import HomeFooter from "../../components/homeCom/HomeFooter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVendors } from "../../redux/VendorSlice";
import { Skeleton } from "@mui/material";

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
        {/* Breadcrumb */}
        <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
          Charity &gt;&gt; Vendors &gt;&gt; {vendor.displayName}
        </p>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
          {/* Vendor Image Section */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <img
              src={vendor.picUrl}
              alt={vendor.displayName}
              className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
            />
          </div>

          {/* Vendor Information Section */}
          <div className="w-full lg:w-5/12 px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-4">
            <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              Vendor Details
            </h1>

            <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-2">
              <span className="break-words">{vendor.displayName}</span>
              <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
                (
                <img
                  src="/icons/star.svg"
                  alt="star"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
                />
                {vendor.rating})
              </span>
            </h2>

            <div className="space-y-3">
              <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                <img
                  src="/icons/send.svg"
                  alt="location"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                />
                <span className="font-semibold text-lightBrownYellow">
                  Address:
                </span>
                <span className="ml-2">{vendor.address}</span>
              </div>

              <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                <img
                  src="/icons/clock.svg"
                  alt="clock"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                />
                <span className="font-semibold text-lightBrownYellow">
                  Status:
                </span>
                <span
                  className={`ml-2 ${
                    vendor.isOpen ? "text-green-600" : "text-red-600"
                  }`}>
                  {vendor.isOpen ? "Open" : "Closed"}
                </span>
              </div>

              <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                <img
                  src="/icons/star.svg"
                  alt="rating"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                />
                <span className="font-semibold text-lightBrownYellow">
                  Rating:
                </span>
                <span className="ml-2">{vendor.rating}/5</span>
              </div>

              {vendor.logoUrl && (
                <div className="pt-3">
                  <p className="text-sm mob470:text-base mob560:text-base md:text-lg font-semibold text-lightBrownYellow mb-2">
                    Logo:
                  </p>
                  <img
                    src={vendor.logoUrl}
                    alt={`${vendor.displayName} logo`}
                    className="w-24 h-24 mob470:w-28 mob470:h-28 mob560:w-32 mob560:h-32 object-contain rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="py-4 mob470:py-5 mob560:py-5 px-6 lg:px-8">
          <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-3">
            About {vendor.displayName}
          </h4>
          <p className="text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed text-gray-700">
            {vendor.displayName} is a trusted vendor in our charity program,
            located in {vendor.address}. They have earned a rating of{" "}
            {vendor.rating}/5 from our community and are currently{" "}
            {vendor.isOpen ? "open" : "closed"} for business. This vendor is
            committed to reducing food waste while providing quality products to
            our customers.
          </p>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
