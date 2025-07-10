import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavoriteFoods, toggleFavorite } from "../../redux/FoodSlice";
import {
  fetchUserFavoriteVendors,
  toggleVendorFavorite,
} from "../../redux/VendorFilterSlice";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function FavoriteItems() {
  const dispatch = useDispatch();
  const { favoriteFoods, loading, error } = useSelector(
    (state) => state.servicesFood
  );
  const { favoriteVendors, favVendorsLoading, favVendorsError } = useSelector(
    (state) => state.vendorFilter
  );
  const { bags } = useSelector((state) => state.bags);

  useEffect(() => {
    dispatch(fetchUserFavoriteFoods());
    dispatch(fetchUserFavoriteVendors());
  }, [dispatch]);

  const handleToggleFav = (foodId) => {
    Swal.fire({
      title: "Are you sure to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#225A4B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(toggleFavorite({ foodId, isCurrentlyFavorited: true }));
      }
    });
  };

  const handleToggleVendorFav = (vendorId) => {
    Swal.fire({
      title: "Are you sure to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#225A4B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          toggleVendorFavorite({ vendorId, isCurrentlyFavorited: true })
        );
      }
    });
  };

  // Debug: Log the favoriteFoods data
  console.log("favoriteFoods data:", favoriteFoods);
  console.log("favoriteFoods type:", typeof favoriteFoods);
  console.log("favoriteFoods is array:", Array.isArray(favoriteFoods));

  // Ensure favoriteFoods is an array
  const foodsArray = Array.isArray(favoriteFoods) ? favoriteFoods : [];
  const vendorsArray = Array.isArray(favoriteVendors) ? favoriteVendors : [];

  if (error) {
    return (
      <div className="w-11/12 md:w-10/12 mx-auto bg-semiDarkBeige my-5 p-4 md:p-8 text-center rounded-lg">
        <p className="text-red-600 font-nunitoBold text-base md:text-lg">
          Error: {error}
        </p>
        <button
          onClick={() => dispatch(fetchUserFavoriteFoods())}
          className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Favorite Foods Section */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 font-nunitoBold">
        My Favorite Foods
      </h1>
      <section className="w-full md:w-10/12 mx-auto bg-semiDarkBeige my-4 md:my-8 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold">
        <div className="absolute -top-3 md:-top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-2 md:mx-4 gap-2">
          <span className="bg-white p-1 md:p-2 rounded-md text-sm md:text-base lg:text-lg font-semibold text-center sm:text-left">
            My Favorite Foods ({foodsArray.length} items)
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto p-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative mx-auto"
                key={idx}>
                {/* Top badges skeleton - quantity and rating */}
                <div className="flex absolute justify-between m-3 left-0 right-0 overflow-hidden">
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    sx={{ borderRadius: "6px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={24}
                    sx={{ borderRadius: "6px" }}
                  />
                </div>

                {/* Main image skeleton */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={192}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />

                <div className="p-2 relative">
                  {/* Favorite button skeleton */}
                  <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    sx={{ position: "absolute", left: -16, top: -40 }}
                  />

                  {/* Discount badge skeleton */}
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ position: "absolute", right: 8, top: -64 }}
                  />

                  {/* Food name skeleton */}
                  <Skeleton width="70%" height={24} sx={{ marginTop: 8 }} />

                  {/* Vendor name skeleton */}
                  <Skeleton width="50%" height={20} sx={{ marginTop: 4 }} />

                  {/* Status skeleton */}
                  <Skeleton width="30%" height={20} sx={{ marginTop: 2 }} />

                  {/* Price section skeleton */}
                  <div className="flex justify-between py-2 mt-2">
                    <Skeleton width="20%" height={20} />
                    <div className="flex flex-col items-end">
                      <Skeleton
                        width="60px"
                        height={16}
                        sx={{ marginBottom: 2 }}
                      />
                      <Skeleton width="80px" height={20} />
                    </div>
                  </div>

                  {/* Button skeleton */}
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ borderRadius: "12px", marginTop: 8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : foodsArray.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-600 font-nunitoBold text-base md:text-lg">
              You haven't added any foods to your favorites yet
            </p>
            <Link
              to="/CharityPage"
              className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors inline-block text-sm md:text-base">
              Browse Foods
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto p-4">
            {foodsArray.map((food) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative mx-auto"
                key={food.id}>
                <div className="flex absolute justify-between m-3 left-0 right-0 overflow-hidden">
                  <span className="bg-semiDarkBeige px-2 py-1 rounded-md">
                    {food.quantity ||
                      food.availableQuantity ||
                      food.stockQuantity ||
                      0}
                    + left
                  </span>
                  <span className="flex items-center bg-semiDarkBeige px-2 py-1 rounded-md">
                    <img
                      src="/icons/star.svg"
                      alt="star"
                      className="w-3 text-center mr-1"
                    />
                    {food.rating || food.averageRating || food.rate || 0}
                  </span>
                </div>

                <img
                  src={
                    food.picUrl ||
                    food.imageUrl ||
                    food.photoUrl ||
                    food.image ||
                    "/public/services/foodlistingtest.png"
                  }
                  alt={food.name || food.title || "Food item"}
                  className="w-full rounded-se-xl rounded-ss-xl h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/public/services/foodlistingtest.png";
                  }}
                />

                <div className="p-2 relative">
                  <div className="flex justify-between">
                    <span className="shadow-xl rounded-full bg-semiDarkBeige p-3 absolute -left-4 -top-10">
                      <FavoriteOutlinedIcon
                        className="cursor-pointer text-btnsGreen"
                        onClick={() => handleToggleFav(food.id)}
                      />
                    </span>
                    {food.discountPercentage && (
                      <span className="bg-semiBrightYellow py-3 px-1.5 rounded-full text-xl font-bold absolute right-2 -top-16">
                        %{food.discountPercentage}
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl font-medium">
                    {food.name || food.title}
                  </h1>
                  <span>
                    {food.vName ||
                      food.vendorName ||
                      food.restaurantName ||
                      food.vendor ||
                      "Unknown Vendor"}
                  </span>
                  <span>({food.isOpen ? "opened" : "closed"})</span>

                  <div className="flex justify-between py-2">
                    <span className="text-lg">Price</span>
                    <div className="">
                      <span className="text-sm px-1 line-through">
                        EGP{food.unitPrice || food.originalPrice || food.price}
                      </span>
                      <span className="text-btnsGreen font-semibold text-lg">
                        EGP{food.newPrice || food.discountedPrice || food.price}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/CharityPage/cart/${food.id}`}
                    className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block hover:bg-btnsGreen hover:text-white transition-colors duration-300">
                    More Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Favorite Vendors Section */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 font-nunitoBold">
        My Favorite Vendors
      </h1>
      <section className="w-full md:w-10/12 mx-auto bg-semiDarkBeige my-4 md:my-8 flex flex-wrap justify-center py-4 relative rounded-lg font-nunitoBold">
        <div className="absolute -top-3 md:-top-5 left-1 right-1 flex flex-col sm:flex-row justify-between mx-2 md:mx-4 gap-2">
          <span className="bg-white p-1 md:p-2 rounded-md text-sm md:text-base lg:text-lg font-semibold text-center sm:text-left">
            My Favorite Vendors ({vendorsArray.length} items)
          </span>
        </div>
        {favVendorsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative mx-auto"
                key={idx}>
                {/* Rating badge skeleton at top right */}
                <div className="flex absolute justify-end m-3 left-0 right-0 overflow-hidden">
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={24}
                    sx={{ borderRadius: "6px" }}
                  />
                </div>

                {/* Vendor image skeleton */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={192}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />

                <div className="p-2 relative">
                  {/* Favorite button skeleton */}
                  <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    sx={{ position: "absolute", left: -16, top: -40 }}
                  />

                  {/* Vendor name and logo section skeleton */}
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton width="60%" height={24} />
                    <Skeleton
                      variant="circular"
                      width={36}
                      height={36}
                      sx={{ marginLeft: 8 }}
                    />
                  </div>

                  {/* Category skeleton */}
                  <Skeleton width="40%" height={20} sx={{ marginTop: 4 }} />

                  {/* Address and status section skeleton */}
                  <div className="flex items-center py-1 justify-between mt-2">
                    <Skeleton width="50%" height={16} />
                    <Skeleton
                      width="60px"
                      height={20}
                      sx={{ borderRadius: "4px" }}
                    />
                  </div>

                  {/* Description skeleton */}
                  <Skeleton width="90%" height={16} sx={{ marginTop: 4 }} />
                  <Skeleton width="70%" height={16} sx={{ marginTop: 2 }} />

                  {/* Empty space for spacing */}
                  <div className="flex justify-between py-2">
                    <span></span>
                  </div>

                  {/* Button skeleton */}
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ borderRadius: "12px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : favVendorsError ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-600 font-nunitoBold text-base md:text-lg">
              {favVendorsError}
            </p>
          </div>
        ) : vendorsArray.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-gray-600 font-nunitoBold text-base md:text-lg">
              You haven't added any vendors to your favorites yet
            </p>
            <Link
              to="/CharityPage"
              className="mt-4 bg-btnsGreen text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors inline-block text-sm md:text-base">
              Browse Vendors
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full lg:w-[85%] mx-auto p-4">
            {vendorsArray.map((vendor) => (
              <div
                className="w-full max-w-xs border border-stone-700 rounded-xl relative mx-auto"
                key={vendor.userId || vendor.id}>
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
                      className="cursor-pointer text-btnsGreen"
                      onClick={() =>
                        handleToggleVendorFav(vendor.userId || vendor.id, true)
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
                        }`}>
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
                    className="text-center w-full p-2 border-2 border-btnsGreen rounded-xl text-btnsGreen font-semibold inline-block hover:bg-btnsGreen hover:text-white transition-colors duration-300">
                    More Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default FavoriteItems;
