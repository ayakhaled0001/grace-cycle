import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVendorDetails } from "../../redux/VendorDetailsSlice";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import VendorItemsOffered from "../../components/charityCom/vendorDetCom/VendorItemsOffered";
import SimilarVendors from "../../components/charityCom/vendorDetCom/SimilarVendors";
import DishReview from "../../components/charityCom/cartCom/DishReview";
import VendorInfoCard from "../../components/charityCom/cartCom/VendorInfoCard";
import HomeFooter from "../../components/homeCom/HomeFooter";

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
  const normalItems =
    itemsOffered?.filter((item) => item.type !== "bag") || itemsOffered || [];

  return (
    <>
      <div className="pt-20 px-4 bg-bgBeigeWhite">
        {/* Breadcrumb */}
        <nav className="text-semilightGrey font-nunito py-2 text-xs md:text-base mb-4 lg:w-10/12 lg:mx-auto">
          Charity &gt; Restaurant &gt; {vendorDetails.displayName}
        </nav>

        {/* Hero Section */}
        <VendorInfoCard vendor={vendorDetails} />

        {/* Description */}
        <section className="mb-8 lg:w-10/12 lg:mx-auto">
          <h3 className="text-lightBrownYellow text-lg font-bold mb-2 my-3">
            Description
          </h3>
          <p className="text-base text-gray-700 ">
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
          <div className="flex items-center justify-between mb-4 lg:w-10/12 lg:mx-auto">
            <h3 className="text-lightBrownYellow text-lg font-bold">
              Items offered
            </h3>
            <button className="border border-btnsGreen text-btnsGreen px-4 py-1 rounded-lg hover:bg-btnsGreen hover:text-white transition-colors text-sm font-semibold">
              See all items
            </button>
          </div>
          {isLoading ? (
            <div className="mb-8 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 lg:w-10/12 mx-auto">
              <div className="grid grid-cols-1 mob470:grid-cols-2 mob560:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden group flex">
                    {/* Image skeleton */}
                    <div className="relative overflow-hidden rounded-md">
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={192}
                        className="rounded-md"
                      />
                      {/* Discount badge skeleton */}
                      <div className="absolute top-3 right-3">
                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    {/* Content skeleton */}
                    <div className="p-4 w-6/12">
                      {/* Title skeleton */}
                      <Skeleton
                        variant="text"
                        width="90%"
                        height={24}
                        className="mb-1"
                      />
                      {/* Vendor name skeleton */}
                      <Skeleton
                        variant="text"
                        width="70%"
                        height={20}
                        className="mb-3"
                      />
                      {/* Rating skeleton */}
                      <div className="flex items-center gap-1 mb-3">
                        <Skeleton variant="circular" width={16} height={16} />
                        <Skeleton variant="text" width={30} height={16} />
                      </div>
                      {/* Price skeleton */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Skeleton
                            variant="text"
                            width={60}
                            height={16}
                            className="mb-1"
                          />
                          <Skeleton variant="text" width={80} height={24} />
                        </div>
                        <Skeleton variant="circular" width={40} height={40} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : normalItems.length > 0 ? (
            <VendorItemsOffered items={normalItems} />
          ) : (
            <div className="px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 lg:w-10/12 mx-auto">
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Items Available
                </h3>
                <p className="text-gray-500">
                  This vendor doesn&apos;t have any items offered at the moment.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Magic Bags Offered */}
        <section className="mb-8 lg:w-10/12 lg:mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lightBrownYellow text-lg font-bold">
              Magic Bags offered
            </h3>
            <button className="border border-btnsGreen text-btnsGreen px-4 py-1 rounded-lg hover:bg-btnsGreen hover:text-white transition-colors text-sm font-semibold">
              See all Bags
            </button>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 mob470:grid-cols-2 mob560:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={192}
                    className="rounded-t-xl"
                  />
                  <div className="p-4 space-y-2">
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <div className="flex justify-between items-center">
                      <Skeleton variant="text" width={60} height={20} />
                      <Skeleton variant="text" width={80} height={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Magic Bags Available
              </h3>
              <p className="text-gray-500">
                This vendor doesn&apos;t have any magic bags at the moment.
              </p>
            </div>
          )}
        </section>

        {/* Ratings and Reviews */}
        <section className="mb-8 lg:w-10/12 lg:mx-auto">
          <DishReview useVendorReviews />
        </section>

        {/* You can also try (Similar Vendors) */}
        <section className="mb-8 ">
          <h3 className="text-lightBrownYellow text-lg font-bold mb-4 lg:w-10/12 lg:mx-auto">
            You can also try
          </h3>
          {isLoading ? (
            <div className="px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 lg:w-10/12 mx-auto">
              <div className="grid grid-cols-1 mob470:grid-cols-2 mob560:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={192}
                      className="rounded-t-xl"
                    />
                    <div className="p-4 space-y-2">
                      <Skeleton variant="text" width="80%" height={24} />
                      <Skeleton variant="text" width="60%" height={20} />
                      <div className="flex justify-between items-center">
                        <Skeleton variant="text" width={60} height={20} />
                        <Skeleton variant="text" width={80} height={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : similarItems && similarItems.length > 0 ? (
            <SimilarVendors vendors={similarItems} />
          ) : (
            <div className="px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 lg:w-10/12 mx-auto">
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Similar Vendors
                </h3>
                <p className="text-gray-500">
                  No similar vendors found at the moment.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
      <HomeFooter />
    </>
  );
}
