import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVendorDetails } from "../../redux/VendorDetailsSlice";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import VendorItemsOffered from "../../components/charityCom/vendorDetCom/VendorItemsOffered";
import SimilarVendors from "../../components/charityCom/vendorDetCom/SimilarVendors";

export default function VendorDetails() {
  const { vendorId } = useParams();
  const dispatch = useDispatch();
  const { vendorDetails, itemsOffered, similarItems, isLoading, error } =
    useSelector((state) => state.vendorDetails);

  // Fetch vendor details data when component mounts
  useEffect(() => {
    dispatch(getVendorDetails(vendorId));
  }, [dispatch, vendorId]);

  if (isLoading) {
    return (
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
          Charity &gt;&gt; Vendors &gt;&gt; Loading...
        </p>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
          {/* Vendor Image Skeleton */}
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
    );
  }

  if (error) {
    return (
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            {error.includes("UnAuthorized")
              ? "Authentication Required"
              : "Error Loading Vendor"}
          </h2>
          <p className="text-gray-600 mb-4">
            {error.includes("UnAuthorized")
              ? "Please log in to view vendor details."
              : error}
          </p>
          {error.includes("UnAuthorized") && (
            <Link
              to="/login"
              className="inline-block bg-btnsGreen text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Go to Login
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!vendorDetails) {
    return (
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Vendor Not Found
          </h2>
          <p className="text-gray-600">The vendor could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
      {/* Breadcrumb */}
      <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
        Charity &gt;&gt; Vendors &gt;&gt; {vendorDetails.displayName}
      </p>

      {/* Vendor Basic Info Section */}
      <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8 mb-8">
        {/* Vendor Image Section */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <img
            src={vendorDetails.picUrl}
            alt={vendorDetails.displayName}
            className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
          />
        </div>

        {/* Vendor Information Section */}
        <div className="w-full lg:w-5/12 px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-4">
          <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
            Vendor Details
          </h1>

          <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-2">
            <span className="break-words">{vendorDetails.displayName}</span>
            <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
              (
              <img
                src="/icons/star.svg"
                alt="star"
                className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
              />
              {vendorDetails.rating})
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
              <span className="ml-2">{vendorDetails.address}</span>
            </div>

            <div className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
              <img
                src="/icons/clock.svg"
                alt="clock"
                className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
              />
              <span className="font-semibold text-lightBrownYellow">
                Working Hours:
              </span>
              <span className="ml-2">
                {vendorDetails.opening} - {vendorDetails.closing}
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
              <span className="ml-2">{vendorDetails.rating}/5</span>
            </div>

            {vendorDetails.logoUrl && (
              <div className="pt-3">
                <p className="text-sm mob470:text-base mob560:text-base md:text-lg font-semibold text-lightBrownYellow mb-2">
                  Logo:
                </p>
                <img
                  src={vendorDetails.logoUrl}
                  alt={`${vendorDetails.displayName} logo`}
                  className="w-24 h-24 mob470:w-28 mob470:h-28 mob560:w-32 mob560:h-32 object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Use the new components */}
      <VendorItemsOffered items={itemsOffered} />
      <SimilarVendors vendors={similarItems} />

      {/* Description Section */}
      <div className="py-4 mob470:py-5 mob560:py-5 px-6 lg:px-8">
        <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-3">
          About {vendorDetails.displayName}
        </h4>
        <p className="text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed text-gray-700">
          {vendorDetails.description ||
            `${vendorDetails.displayName} is a trusted ${
              vendorDetails.vendorType || "vendor"
            } in our charity program, located in ${
              vendorDetails.address
            }. They have earned a rating of ${
              vendorDetails.rating
            }/5 from our community and are open from ${
              vendorDetails.opening
            } to ${
              vendorDetails.closing
            }. This vendor is committed to reducing food waste while providing quality products to our customers.`}
        </p>
      </div>
    </div>
  );
}
