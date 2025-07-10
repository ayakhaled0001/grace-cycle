import BtnGreen from "../../Ui/BtnGreen";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { addToCart, addBagToCartState } from "../../../redux/FoodSlice";

import {
  toggleFavorite,
  addFoodListingToFavorites,
} from "../../../redux/FoodSlice";
import { toggleBagFavorite } from "../../../redux/BagsSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getVendorDetails } from "../../../redux/VendorDetailsSlice";
import {
  fetchFoodListing,
  clearFoodListing,
  updateFavoriteStatus,
} from "../../../redux/FoodListingSlice";
import { Skeleton } from "@mui/material";
import VendorInfoCard from "./VendorInfoCard";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import axios from "axios";

function DishInfo({ itemId, itemType = "dish", showShoppingCart = true }) {
  const dispatch = useDispatch();
  const { mainDishes, bakedGoods, dessert, drinks } = useSelector(
    (state) => state.servicesFood
  );
  const { bags } = useSelector((state) => state.bags);
  const foodLoading = useSelector((state) => state.servicesFood.loading);
  const cartBags = useSelector((state) => state.servicesFood.cartBags);
  const { vendorDetails, isLoading, error } = useSelector(
    (state) => state.vendorDetails
  );
  const {
    categories,
    vendorId,
    vendorOpeningTime,
    vendorClosingTime,
    description,
    id,
    name,
    picUrl,
    rating,
    unitPrice,
    newPrice,
    vName,
    isLoading: foodListingLoading,
    error: foodListingError,
  } = useSelector((state) => state.foodListing);

  // Get favorite status from the servicesFood slice to ensure consistency
  const { favoriteFoods } = useSelector((state) => state.servicesFood);
  const isItemFavorited = favoriteFoods.some(
    (fav) => fav.id === parseInt(itemId)
  );

  // All hooks at the top, before any logic/returns
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Favorite toggle handler
  const handleToggleFavorite = (itemId, isCurrentlyFavorited) => {
    // For dish type with API data, we need to construct the food data
    if (itemType === "dish" && id) {
      const foodData = {
        id: id,
        name: name,
        picUrl: picUrl,
        rating: rating,
        unitPrice: unitPrice,
        newPrice: newPrice,
        vName: vName,
        vendorId: vendorId,
        isFav: !isCurrentlyFavorited,
      };

      // Dispatch the toggle action
      dispatch(toggleFavorite({ foodId: itemId, isCurrentlyFavorited }));

      // Update the foodListing state to keep it in sync
      dispatch(
        updateFavoriteStatus({
          foodId: itemId,
          isFavourite: !isCurrentlyFavorited,
        })
      );

      // If adding to favorites and not already in favoriteFoods, we need to add it
      if (!isCurrentlyFavorited) {
        dispatch(addFoodListingToFavorites(foodData));
      }
    } else if (itemType === "bag") {
      // For bags, use the local toggleBagFavorite action
      dispatch(toggleBagFavorite({ bagId: itemId, isCurrentlyFavorited }));
      // Optionally updateBags if you want to keep the updateBags logic for other UI sync
      // const updatedBags = ... (can be removed if not needed)
    } else {
      // For other cases (fallback data), use the regular toggle
      dispatch(toggleFavorite({ foodId: itemId, isCurrentlyFavorited }));
    }
  };


  // Fetch vendor details data when component mounts for vendor pages
  useEffect(() => {
    if (itemType === "vendor") {
      dispatch(getVendorDetails(itemId));
    }
  }, [dispatch, itemType, itemId]);

  useEffect(() => {
    if (itemType === "dish" && itemId) {
      dispatch(fetchFoodListing(itemId));
    }
    return () => {
      if (itemType === "dish") {
        dispatch(clearFoodListing());
      }
    };
  }, [dispatch, itemType, itemId]);

  // Handle vendor data
  if (itemType === "vendor") {
    if (isLoading) {
      return (
        <>
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
        </>
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
      <>
        <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
          Charity &gt;&gt; Vendors &gt;&gt; {vendorDetails.displayName}
        </p>
        <VendorInfoCard vendor={vendorDetails} />
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
      </>
    );
  }

  // Handle food listing data for dish type
  if (itemType === "dish") {
    if (foodListingLoading) {
      return (
        <>
          <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
            Charity &gt;&gt; Loading...
          </p>

          {/* Main Content Container */}
          <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
            {/* Food Image Skeleton */}
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
        </>
      );
    }

    // If API failed, fall back to local data
    if (foodListingError && !id) {
      console.log("API failed, falling back to local data");
      // Find the item from all categories
      const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
      const item = allDishes.find((d) => d.id === parseInt(itemId));

      if (!item) {
        return (
          <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
            <div className="text-center py-10">
              <h2 className="text-xl font-bold text-red-600 mb-4">
                Dish not found
              </h2>
              <p className="text-gray-600 mb-4">
                The dish you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <p className="text-gray-500 text-sm">
                API Error: {foodListingError}
              </p>
            </div>
          </div>
        );
      }

      // Use local item data
      const getCategory = () => {
        if (mainDishes.find((d) => d.id === parseInt(itemId)))
          return "main dishes";
        if (bakedGoods.find((d) => d.id === parseInt(itemId)))
          return "baked goods";
        if (dessert.find((d) => d.id === parseInt(itemId))) return "desserts";
        if (drinks.find((d) => d.id === parseInt(itemId))) return "drinks";
        return "food";
      };

      return (
        <>
          <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
            Charity &gt;&gt; {getCategory()} &gt;&gt; {item.name}
          </p>

          {/* Main Content Container */}
          <div
            className={`flex flex-col lg:flex-row justify-center gap-3 mob470:gap-4 mob560:gap-6 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 ${
              showShoppingCart ? "" : "lg:justify-center"
            }`}>
            {/* Image Section */}
            <div
              className={`w-full ${
                showShoppingCart ? "lg:w-6/12" : "lg:w-5/12"
              } flex justify-center relative`}>
              {/* Favorite Icon */}
              <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
                <FavoriteOutlinedIcon
                  className={`cursor-pointer text-lg mob470:text-xl ${
                    isItemFavorited ? "text-btnsGreen" : "text-paleBarkYellow"
                  }`}
                  onClick={() => handleToggleFavorite(item.id, isItemFavorited)}
                />
              </span>
              <img
                src={item.picUrl}
                alt={item.name}
                className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
              />
            </div>

            {/* Item Information Section */}
            <div
              className={`w-full ${
                showShoppingCart ? "lg:w-4/12" : "lg:w-5/12"
              } px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-3 mob470:space-y-3 mob560:space-y-4`}>
              <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                {getCategory().charAt(0).toUpperCase() + getCategory().slice(1)}
              </h1>

              <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-1 mob470:gap-2 mob560:gap-2">
                <span className="break-words">{item.name}</span>
                <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
                  (
                  <img
                    src="/icons/star.svg"
                    alt="star"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
                  />
                  {item.rating})
                </span>
              </h2>

              <p className="py-1 mob470:py-2 mob560:py-2">
                <span className="line-through text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                  EGP{item.unitPrice}
                </span>
                <span className="text-btnsGreen text-xl mob470:text-2xl mob560:text-2xl md:text-3xl px-1 font-semibold">
                  EGP{item.newPrice}
                </span>
              </p>

              <div className="space-y-2 mob470:space-y-3 mob560:space-y-3">
                <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl pt-2 mob470:pt-3 mob560:pt-4">
                  Vendor
                </h3>

                <Link
                  to={`/CharityPage/vendor/${item.vendorId}`}
                  className="flex items-center pt-1 underline text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg hover:text-green-700 transition-colors cursor-pointer">
                  <img
                    src="/icons/person.svg"
                    alt="person"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  {item.vName}
                </Link>

                <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                  <img
                    src="/icons/clock.svg"
                    alt="clock"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  {item.isOpen ? "Open" : "Closed"}
                </p>

                <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                  <img
                    src="/icons/send.svg"
                    alt="location"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  It is 10 km away from you
                </p>
              </div>
            </div>

            {/* Shopping Cart Section - Conditionally Rendered */}
            {showShoppingCart && (
              <div className="w-full lg:w-3/12 p-3 mob470:p-4 mob560:p-4 md:p-6 border-2 border-lightBrownYellow rounded-lg mx-0 md:mx-5 space-y-3 mob470:space-y-4 mob560:space-y-4">
                <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                  Available:
                </h1>
                <span className="text-base mob470:text-lg mob560:text-lg md:text-xl font-nunito">
                  {item.quantity} Pieces
                </span>

                <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
                  <button className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-2 md:px-2 hover:bg-green-600 hover:text-white transition-colors">
                    <img
                      src="/icons/minus.svg"
                      alt="discard item"
                      className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                    />
                  </button>
                  <span className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-nunitoBold">
                    2
                  </span>
                  <button className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:p-2 hover:bg-green-600 transition-colors">
                    <img
                      src="/icons/add.svg"
                      alt="add item"
                      className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                    />
                  </button>
                </div>

                <p className="font-nunito text-lg mob470:text-xl mob560:text-xl md:text-2xl border border-nescafe py-2 md:py-1 rounded-md px-2 md:px-1">
                  Total: <span>EGP {item.newPrice * 2}</span>
                </p>

                <BtnGreen className="w-full text-sm mob470:text-base mob560:text-base md:text-lg py-2 mob470:py-3 mob560:py-3 md:py-2">
                  Add to Cart
                </BtnGreen>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
            <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              Description
            </h4>
            <p className="py-2 md:py-1 text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed">
              {item.description ||
                `${item.name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent meals at discounted prices.`}
            </p>
          </div>
        </>
      );
    }

    if (!id) {
      return (
        <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Dish not found
            </h2>
            <p className="text-gray-600">
              The dish you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </div>
      );
    }

    // Determine category for breadcrumb
    const getCategory = () => {
      if (categories && categories.length > 0) {
        return categories[0].toLowerCase();
      }
      return "food";
    };

    return (
      <>
        <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
          Charity &gt;&gt; {getCategory()} &gt;&gt; {name}
        </p>

        {/* Debug logging */}
        {console.log("DishInfo - vendorId:", vendorId, "vName:", vName)}

        {/* Main Content Container */}
        <div
          className={`flex flex-col lg:flex-row justify-center gap-3 mob470:gap-4 mob560:gap-6 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 ${
            showShoppingCart ? "" : "lg:justify-center"
          }`}>
          {/* Image Section */}
          <div
            className={`w-full ${
              showShoppingCart ? "lg:w-6/12" : "lg:w-5/12"
            } flex justify-center relative`}>
            {/* Favorite Icon - only for dish and bag */}
            <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
              <FavoriteOutlinedIcon
                className={`cursor-pointer text-lg mob470:text-xl ${
                  isItemFavorited ? "text-btnsGreen" : "text-paleBarkYellow"
                }`}
                onClick={() => handleToggleFavorite(id, isItemFavorited)}
              />
            </span>
            <img
              src={picUrl}
              alt={name}
              className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
            />
          </div>

          {/* Item Information Section */}
          <div
            className={`w-full ${
              showShoppingCart ? "lg:w-4/12" : "lg:w-5/12"
            } px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-3 mob470:space-y-3 mob560:space-y-4`}>
            <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              {getCategory().charAt(0).toUpperCase() + getCategory().slice(1)}
            </h1>

            <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-1 mob470:gap-2 mob560:gap-2">
              <span className="break-words">{name}</span>
              <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
                (
                <img
                  src="/icons/star.svg"
                  alt="star"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
                />
                {rating})
              </span>
            </h2>

            <p className="py-1 mob470:py-2 mob560:py-2">
              <span className="line-through text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                EGP{unitPrice}
              </span>
              <span className="text-btnsGreen text-xl mob470:text-2xl mob560:text-2xl md:text-3xl px-1 font-semibold">
                EGP{newPrice}
              </span>
            </p>

            <div className="space-y-2 mob470:space-y-3 mob560:space-y-3">
              <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl pt-2 mob470:pt-3 mob560:pt-4">
                Vendor
              </h3>

              {vendorId ? (
                <Link
                  to={`/CharityPage/vendor/${vendorId}`}
                  onClick={() => {
                    console.log("Navigating to vendor with ID:", vendorId);
                    console.log("Available vendor properties:", {
                      vendorId,
                      vName,
                      vendorOpeningTime,
                      vendorClosingTime,
                    });
                  }}
                  className="flex items-center pt-1 underline text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg hover:text-green-700 transition-colors cursor-pointer">
                  <img
                    src="/icons/person.svg"
                    alt="person"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  {vName}
                </Link>
              ) : (
                <div className="flex items-center pt-1 text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg">
                  <img
                    src="/icons/person.svg"
                    alt="person"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  {vName}
                </div>
              )}

              <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                <img
                  src="/icons/clock.svg"
                  alt="clock"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                />
                {vendorOpeningTime} - {vendorClosingTime}
              </p>

              <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                <img
                  src="/icons/send.svg"
                  alt="location"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                />
                It is 10 km away from you
              </p>
            </div>
          </div>

          {/* Shopping Cart Section - Conditionally Rendered */}
          {showShoppingCart && (
            <div className="w-full lg:w-3/12 p-3 mob470:p-4 mob560:p-4 md:p-6 border-2 border-lightBrownYellow rounded-lg mx-0 md:mx-5 space-y-3 mob470:space-y-4 mob560:space-y-4">
              <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                Available:
              </h1>
              <span className="text-base mob470:text-lg mob560:text-lg md:text-xl font-nunito">
                {quantity} Pieces
              </span>

              <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
                <button className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-2 md:px-2 hover:bg-green-600 hover:text-white transition-colors">
                  <img
                    src="/icons/minus.svg"
                    alt="discard item"
                    className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                  />
                </button>
                <span className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-nunitoBold">
                  2
                </span>
                <button className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:p-2 hover:bg-green-600 transition-colors">
                  <img
                    src="/icons/add.svg"
                    alt="add item"
                    className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                  />
                </button>
              </div>

              <p className="font-nunito text-lg mob470:text-xl mob560:text-xl md:text-2xl border border-nescafe py-2 md:py-1 rounded-md px-2 md:px-1">
                Total: <span>EGP {newPrice * 2}</span>
              </p>

              <BtnGreen className="w-full text-sm mob470:text-base mob560:text-base md:text-lg py-2 mob470:py-3 mob560:py-3 md:py-2">
                Add to Cart
              </BtnGreen>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
          <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
            Description
          </h4>
          <p className="py-2 md:py-1 text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed">
            {description ||
              `${name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent meals at discounted prices.`}
          </p>
        </div>
      </>
    );
  }

  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const item =
    itemType === "bag"
      ? bags.find((b, index) => {
          // Try to match by ID first, then by index
          const bagId = b.id || b.bagId || b._id || index;
          return bagId.toString() === itemId.toString();
        })
      : allDishes.find((d) => d.id === parseInt(itemId));

  // Handlers for increment/decrement
  const handleIncrement = () => {
    if (item && quantity < item.quantity) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (!item) return;

    // Check if bag is already in cart
    if (itemType === "bag" && cartBags.includes(item.id)) {
      Swal.fire({
        icon: "info",
        title: "Bag Already in Cart",
        text: "This magic bag is already in your cart",
        showConfirmButton: true,
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in to add items to cart",
        showConfirmButton: true,
      });
      return;
    }

    setLoading(true);

    try {
      if (itemType === "bag") {
        // Handle bag addition
        const bagPayload = {
          vendorId: item.vendorId || "cb5ba1ee-bb67-418e-aeda-8c628ddc58ff",
          bag: {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            unitPrice: item.unitPrice || item.price,
            newPrice: item.newPrice,
            quantity: quantity,
            foods: item.foods || ["falafel", "Foul", "Bread"], // Default foods if not available
          },
          vendorName: item.vName || "Vendor1",
        };

        const response = await axios.post(
          "https://gracecycleapi.azurewebsites.net/api/webcart/add-bag",
          bagPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Bag added to cart:", response.data);

        // Update local state to track bag in cart
        dispatch(addBagToCartState(item.id));

        Swal.fire({
          icon: "success",
          title: "Bag Added to Cart!",
          text: "This magic bag has been added to your cart successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Handle regular item addition
        const payload = {
          vendorId: item.vendorId,
          item: {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            unitPrice: item.unitPrice,
            newPrice: item.newPrice,
            quantity: quantity,
          },
          vendorName: item.vName || "SupermarketTwo",
        };

        const resultAction = await dispatch(addToCart(payload));

        if (addToCart.fulfilled.match(resultAction)) {
          Swal.fire({
            icon: "success",
            title: "Added to Cart!",
            text: "This item added to cart successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          throw new Error("Failed to add item to cart");
        }
      }
    } catch (error) {
      console.log("Add to cart error:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add item to cart",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in to delete items from cart",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await axios.put(
        "https://gracecycleapi.azurewebsites.net/api/webcart/update-item",
        {
          vendorId: item.vendorId,
          item: {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            unitPrice: item.unitPrice,
            newPrice: item.newPrice,
            quantity: 0,
          },
          vendorName: item.vName || "SupermarketTwo",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Deleted from Cart!",
        text: "Item has been removed from cart successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete item from cart",
        showConfirmButton: true,
      });
    }
  };

  // Find the item from all categories for bag type
  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const fallbackItem =
    itemType === "bag"
      ? bags.find((b) => String(b.id || b.bagId || b._id) === itemId)

  const item = id
    ? {
        id,
        name,
        picUrl,
        isFavourite,
        isFavourite: isItemFavorited,
        unitPrice,
        newPrice,
        quantity: fallbackItem?.quantity,
        vendorId,
        vName,
        isOpen: true,
      }
    : fallbackItem;

  if (!item) {
    return (
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            {itemType === "bag" ? "Magic Bag" : "Dish"} not found
          </h2>
          <p className="text-gray-600">
            The {itemType === "bag" ? "magic bag" : "dish"} you're looking for
            doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const getCategory = () => {
    if (itemType === "bag") return "magic bags";
    if (categories && categories.length > 0) return categories[0].toLowerCase();
    if (mainDishes.find((d) => d.id === parseInt(itemId))) return "main dishes";
    if (bakedGoods.find((d) => d.id === parseInt(itemId))) return "baked goods";
    if (dessert.find((d) => d.id === parseInt(itemId))) return "desserts";
    if (drinks.find((d) => d.id === parseInt(itemId))) return "drinks";
    return "food";
  };

  const originalPrice = itemType === "bag" ? item.price : item.unitPrice;
  const discountedPrice = item.newPrice;

  return (
    <>
      <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
        Charity &gt;&gt; {getCategory()} &gt;&gt; {item.name}
      </p>

      {/* Content Container */}
      <div
        className={`flex flex-col lg:flex-row justify-center gap-3 mob470:gap-4 mob560:gap-6 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 ${
          showShoppingCart ? "" : "lg:justify-center"
        }`}>
        {/* Image */}
        <div
          className={`w-full ${
            showShoppingCart ? "lg:w-6/12" : "lg:w-5/12"
          } flex justify-center relative`}>
          {/* Favorite Icon - only for dishes */}
          {itemType === "dish" && (
            <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
              <FavoriteOutlinedIcon
                className={`cursor-pointer text-lg mob470:text-xl ${
                  isItemFavorited ? "text-btnsGreen" : "text-paleBarkYellow"
                }`}
                onClick={() => handleToggleFavorite(item.id, isItemFavorited)}
              />
            </span>
          )}
          <img
            src={item.picUrl}
            alt={item.name}
            className="w-full max-w-sm rounded-md h-56 mob470:h-64 object-cover"
          />
        </div>

        {/* Info */}
        <div
          className={`w-full ${
            showShoppingCart ? "lg:w-4/12" : "lg:w-5/12"
          } px-2 space-y-4`}>
          <h1 className="text-lightBrownYellow font-semibold text-2xl">
            {getCategory().charAt(0).toUpperCase() + getCategory().slice(1)}
          </h1>
          <h2 className="text-3xl font-bold">{item.name}</h2>
          <p className="text-xl text-btnsGreen font-semibold">
            <span className="line-through text-gray-400 pr-2">
              EGP{originalPrice}
            </span>
            EGP{discountedPrice}
          </p>

          <Link
            to={`/CharityPage/vendor/${item.vendorId}`}
            className="underline text-btnsGreen hover:text-green-700">
            Vendor: {item.vName}
          </Link>
        </div>

        {/* Cart */}
        {showShoppingCart && (
          <div className="w-full lg:w-3/12 p-4 border-2 border-lightBrownYellow rounded-lg space-y-4">
            <h1 className="text-lightBrownYellow font-semibold text-xl">
              Available:
            </h1>
            <span className="text-lg">{item.quantity} Pieces</span>
            <div className="flex items-center justify-around">
              <button
                onClick={handleDecrement}
                className="border-2 border-btnsGreen rounded-md p-2 hover:bg-btnsGreen hover:text-white">
                <img src="/icons/minus.svg" alt="-" className="w-4 h-4" />
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 hover:bg-green-600">
                <img src="/icons/add.svg" alt="+" className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xl font-semibold border border-nescafe rounded-md p-2">
              Total: EGP {Math.ceil(discountedPrice * quantity)}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={loading || foodLoading}
              className={`w-full rounded-md p-3 text-lg ${
                cartBags.includes(item.id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-btnsGreen text-white hover:bg-green-700"
              }`}>
              {loading || foodLoading
                ? "Loading..."
                : cartBags.includes(item.id)
                ? "Already in Cart"
                : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
      {/* Description */}
      <div className="py-6 px-4">
        <h4 className="text-lightBrownYellow text-2xl font-bold mb-2">
          Description
        </h4>
        <p className="text-lg leading-relaxed">
          {item.description ||
            `${item.name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing excellent meals at discounted prices.`}
        </p>
      </div>
    </>
  );
}

export default DishInfo;
