import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  setCurrentPage,
  fetchAllVendors,
  toggleVendorFavorite,
} from "../../redux/VendorFilterSlice";

const VendorResults = ({ onClear }) => {
  const dispatch = useDispatch();
  const {
    allVendors,
    totalCount,
    currentPage,
    pageSize,
    loading,
    error,
    searchTerm,
    sortBy,
    vendorTypeId,
  } = useSelector((state) => state.vendorFilter);

  const { vendorCategories } = useSelector((state) => state.vendorCategories);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Get category name by ID
  const getCategoryName = () => {
    if (!vendorTypeId) return "Vendor Results";
    const category = vendorCategories.find(
      (cat) => cat.id.toString() === vendorTypeId.toString()
    );
    return category ? category.type : "Vendor Results";
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(
      fetchAllVendors({
        search: searchTerm,
        sort: sortBy,
        vendorTypeId: vendorTypeId,
        pageIndex: page,
        pageSize: 9,
      })
    );
  };

  const handleToggleVendorFav = (vendorId, isCurrentlyFavorited) => {
    dispatch(toggleVendorFavorite({ vendorId, isCurrentlyFavorited }));
  };

  if (error) {
    return (
      <div className="w-11/12 md:w-10/12 mx-auto bg-semiDarkBeige my-5 p-4 md:p-8 text-center rounded-lg">
        <p className="text-red-600 font-nunitoBold text-base md:text-lg">
          Error: {error}
        </p>
        <button
          onClick={onClear}
          className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors"
        >
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <section className="w-11/12 md:w-10/12 lg:w-[80%] mx-auto bg-semiDarkBeige my-5 flex flex-col py-4 relative rounded-lg font-nunitoBold">
      <div className="absolute -top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-4 gap-2">
        <span className="bg-white p-1 rounded-md text-base md:text-lg font-semibold text-center sm:text-left">
          {getCategoryName()} ({totalCount} items)
        </span>
        <button
          onClick={onClear}
          className="bg-white p-1 rounded-md text-base md:text-lg text-lightBrownYellow underline hover:text-btnsGreen"
        >
          Clear Search
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-xs border border-stone-700 rounded-xl relative"
            >
              <Skeleton
                sx={{ bgcolor: "grey.900", borderRadius: "12px 12px 0 0" }}
                variant="rectangular"
                width="100%"
                height={128}
              />
              <div className="p-2">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            </div>
          ))}
        </div>
      ) : allVendors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 font-nunitoBold text-lg">
            No vendors found matching your criteria
          </p>
          <button
            onClick={onClear}
            className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto">
            {allVendors.map((vendor) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative mx-auto"
                key={vendor.userId || vendor.id}
              >
                {/* Rating at top right only */}
                <div className="flex absolute justify-end m-3 left-0 right-0 overflow-hidden">
                  <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
                    <img
                      src="/icons/star.svg"
                      alt="star"
                      className="w-3 text-center mr-1"
                    />
                    {vendor.rating || vendor.averageRating || vendor.rate || 0}
                  </span>
                </div>
                {/* Vendor Image */}
                <img
                  src={
                    vendor.picUrl ||
                    vendor.imageUrl ||
                    vendor.photoUrl ||
                    vendor.image ||
                    vendor.logoUrl ||
                    "/public/services/restaurants.png"
                  }
                  alt={vendor.displayName || vendor.name || "Vendor"}
                  className="w-full rounded-se-xl rounded-ss-xl h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/public/services/restaurants.png";
                  }}
                />
                <div className="p-2 relative">
                  {/* Favorite button */}
                  <span className="shadow-xl rounded-full bg-semiDarkBeige p-3 absolute -left-4 -top-10">
                    <FavoriteOutlinedIcon
                      className={`cursor-pointer ${
                        vendor.isFav || vendor.isFavourite
                          ? "text-btnsGreen"
                          : "text-paleBarkYellow"
                      }`}
                      onClick={() =>
                        handleToggleVendorFav(
                          vendor.userId || vendor.id,
                          vendor.isFav || vendor.isFavourite
                        )
                      }
                    />
                  </span>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-medium">
                      {vendor.displayName || vendor.name}
                    </h1>
                    {/* Vendor Logo as small circle */}
                    <span className="ml-2 flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={
                          vendor.logoUrl ||
                          vendor.picUrl ||
                          vendor.imageUrl ||
                          vendor.photoUrl ||
                          vendor.image ||
                          "/public/services/restaurants.png"
                        }
                        alt="logo"
                        className="w-9 h-9 object-cover"
                        onError={(e) => {
                          e.target.src = "/public/services/restaurants.png";
                        }}
                      />
                    </span>
                  </div>
                  <span className="text-gray-600">
                    {vendor.type ||
                      vendor.categoryName ||
                      vendor.category ||
                      ""}
                  </span>
                  {vendor.address && (
                    <div className="flex items-center py-1 justify-between">
                      <span className="text-sm text-gray-500">
                        📍 {vendor.address}
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          vendor.isOpen
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {vendor.isOpen ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  )}

                  {vendor.description && (
                    <p className="text-sm text-gray-600 py-1 line-clamp-2">
                      {vendor.description}
                    </p>
                  )}

                  <div className="flex justify-between py-2">
                    <span></span>
                  </div>

                  <Link
                    to={`/CharityPage/cart/${vendor.id}`}
                    className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block hover:bg-btnsGreen hover:text-white transition-colors duration-300"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-4 md:mt-6 gap-1 md:gap-2 px-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-lightGrey rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm md:text-base"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show only current page, first page, last page, and pages around current
                const shouldShow =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!shouldShow) {
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span
                        key={page}
                        className="px-1 sm:px-2 py-1.5 sm:py-2 text-xs sm:text-sm"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md ${
                      currentPage === page
                        ? "bg-btnsGreen text-white border-btnsGreen"
                        : "border-lightGrey hover:bg-gray-50"
                    } text-xs sm:text-sm md:text-base`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-lightGrey rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm md:text-base"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default VendorResults;
