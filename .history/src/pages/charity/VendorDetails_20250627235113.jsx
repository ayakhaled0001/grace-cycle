import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVendorDetails } from "../../redux/VendorDetailsSlice";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import VendorItemsOffered from "../../components/charityCom/vendorDetCom/VendorItemsOffered";
import SimilarVendors from "../../components/charityCom/vendorDetCom/SimilarVendors";
import DishReview from "../../components/charityCom/cartCom/DishReview";

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
      <div className="pt-20 px-4 bg-bgBeigeWhite">
        <Skeleton variant="text" width="40%" height={30} />
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <Skeleton
            variant="rectangular"
            width={350}
            height={220}
            className="rounded-xl"
          />
          <div className="flex-1 space-y-4">
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
      <div className="pt-20 px-4 bg-bgBeigeWhite">
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
      <div className="pt-20 px-4 bg-bgBeigeWhite">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Vendor Not Found
          </h2>
          <p className="text-gray-600">The vendor could not be found.</p>
        </div>
      </div>
    );
  }

  // Placeholder for magic bags (should be fetched from API if available)
  const magicBags = itemsOffered?.filter((item) => item.type === "bag") || [];
  const normalItems =
    itemsOffered?.filter((item) => item.type !== "bag") || itemsOffered || [];

  return (
    <div className="pt-20 px-4 bg-bgBeigeWhite">
      {/* Breadcrumb */}
      <nav className="text-semilightGrey font-nunito py-2 text-xs md:text-base mb-4">
        Charity &gt; Restaurant &gt; {vendorDetails.displayName}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow p-6 mb-8">
        {/* Vendor Image + Favorite + Icon */}
        <div className="relative w-full md:w-1/3 max-w-xs">
          <img
            src={vendorDetails.picUrl}
            alt={vendorDetails.displayName}
            className="w-full h-56 object-cover rounded-xl"
          />
          {/* Favorite Button */}
          <button className="absolute top-3 left-3 bg-white/80 rounded-full p-2 shadow hover:bg-btnsGreen hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-btnsGreen">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.676 0-3.163.936-3.937 2.337C11.851 4.686 10.364 3.75 8.688 3.75 6.099 3.75 4 5.765 4 8.25c0 7.22 8 12 8 12s8-4.78 8-12z"
              />
            </svg>
          </button>
          {/* Restaurant Icon */}
          <div className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-btnsGreen">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3v2.25m4.5-2.25v2.25m-7.5 4.5h10.5M4.5 19.5V7.5A2.25 2.25 0 016.75 5.25h10.5A2.25 2.25 0 0119.5 7.5v12m-15 0h15"
              />
            </svg>
          </div>
        </div>
        {/* Vendor Info */}
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <h2 className="text-lightBrownYellow text-lg font-bold">
            Restaurant
          </h2>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            {vendorDetails.displayName}
            <span className="flex items-center text-base text-gray-600 font-normal">
              (
              <img
                src="/icons/star.svg"
                alt="star"
                className="w-4 h-4 inline-block mr-1"
              />
              {vendorDetails.rating})
            </span>
          </h1>
          <Link
            to="#"
            className="text-btnsGreen underline text-base font-medium">
            {vendorDetails.address}
          </Link>
          <div className="flex items-center gap-3 text-gray-700 text-base">
            <img src="/icons/clock.svg" alt="clock" className="w-4 h-4" />
            Open from {vendorDetails.opening} to {vendorDetails.closing}
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-base">
            <img src="/icons/send.svg" alt="location" className="w-4 h-4" />
            It is 10 km away from you
          </div>
          {vendorDetails.logoUrl && (
            <img
              src={vendorDetails.logoUrl}
              alt="logo"
              className="w-20 h-20 object-contain rounded-lg border border-gray-200 mt-2"
            />
          )}
        </div>
      </section>

      {/* Description */}
      <section className="mb-8">
        <h3 className="text-lightBrownYellow text-lg font-bold mb-2">
          Description
        </h3>
        <p className="text-base text-gray-700">
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
      </section>

      {/* Items Offered */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lightBrownYellow text-lg font-bold">
            Items offered
          </h3>
          <button className="border border-btnsGreen text-btnsGreen px-4 py-1 rounded-lg hover:bg-btnsGreen hover:text-white transition-colors text-sm font-semibold">
            See all items
          </button>
        </div>
        <VendorItemsOffered items={normalItems} />
      </section>

      {/* Magic Bags Offered */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lightBrownYellow text-lg font-bold">
            Magic Bags offered
          </h3>
          <button className="border border-btnsGreen text-btnsGreen px-4 py-1 rounded-lg hover:bg-btnsGreen hover:text-white transition-colors text-sm font-semibold">
            See all Bags
          </button>
        </div>
        {/* You can reuse VendorItemsOffered for bags, or create a new component if needed */}
        <VendorItemsOffered items={magicBags} />
      </section>

      {/* Ratings and Reviews */}
      <section className="mb-8">
        <DishReview />
      </section>

      {/* You can also try (Similar Vendors) */}
      <section className="mb-8">
        <h3 className="text-lightBrownYellow text-lg font-bold mb-4">
          You can also try
        </h3>
        <SimilarVendors vendors={similarItems} />
      </section>
    </div>
  );
}
