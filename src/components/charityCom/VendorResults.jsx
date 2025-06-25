import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { setCurrentPage, fetchAllVendors } from "../../redux/VendorFilterSlice";

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

  if (error) {
    return (
      <div className="w-10/12 mx-auto bg-semiDarkBeige my-5 p-8 text-center rounded-lg">
        <p className="text-red-600 font-nunitoBold text-lg">Error: {error}</p>
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
    <section className="w-10/12 mx-auto bg-semiDarkBeige my-5 flex flex-col py-4 relative rounded-lg font-nunitoBold">
      <div className="absolute -top-5 left-1 right-1 flex justify-between mx-4">
        <span className="bg-white p-1 rounded-md text-lg font-semibold">
          {getCategoryName()} ({totalCount} items)
        </span>
        <button
          onClick={onClear}
          className="bg-white p-1 rounded-md text-lg text-lightBrownYellow underline hover:text-btnsGreen"
        >
          Clear Search
        </button>
      </div>

      {loading ? (
        <div className="flex flex-wrap justify-center">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="m-3 w-3/12 border border-stone-700 rounded-xl relative"
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
          <div className="flex flex-wrap justify-center">
            {allVendors.map((vendor) => (
              <div
                className="m-3 w-3/12 border border-stone-700 rounded-xl relative"
                key={vendor.userId}
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
                        vendor.isFavourite
                          ? "text-btnsGreen"
                          : "text-paleBarkYellow"
                      }`}
                      onClick={() => {
                        // TODO: handle vendor favorite toggle
                        console.log(
                          "Toggle favorite for vendor:",
                          vendor.userId
                        );
                      }}
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
                    to={`/vendor/${vendor.userId}`}
                    className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block hover:bg-btnsGreen hover:text-white transition-colors"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-lightGrey rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-md ${
                      currentPage === page
                        ? "bg-btnsGreen text-white border-btnsGreen"
                        : "border-lightGrey hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-lightGrey rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
