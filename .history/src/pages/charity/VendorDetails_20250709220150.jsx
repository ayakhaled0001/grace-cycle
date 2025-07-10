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
      <nav className="text-semilightGrey font-nunito py-2 text-xs md:text-base mb-4 lg:w-10/12 lg:mx-auto">
        Charity &gt; Restaurant &gt; {vendorDetails.displayName}
      </nav>

      {/* Hero Section */}
      <VendorInfoCard vendor={vendorDetails} />

      {/* Description */}
      <section className="mb-8">
        <h3 className="text-lightBrownYellow text-lg font-bold mb-2 lg:w-10/12 lg:mx-auto my-3">
          Description
        </h3>
        <p className="text-base text-gray-700 lg:w-10/12 lg:mx-auto">
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
        <DishReview useVendorReviews />
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
