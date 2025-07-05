import BtnGreen from "../../Ui/BtnGreen";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getVendorDetails } from "../../../redux/VendorDetailsSlice";
import {
  fetchFoodListing,
  clearFoodListing,
} from "../../../redux/FoodListingSlice";
import { Skeleton } from "@mui/material";
import VendorInfoCard from "./VendorInfoCard";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

function DishInfo({ itemId, itemType = "dish", showShoppingCart = true }) {
  const dispatch = useDispatch();
  const { mainDishes, bakedGoods, dessert, drinks } = useSelector(
    (state) => state.servicesFood
  );
  const { bags } = useSelector((state) => state.bags);
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
    isFavourite,
    quantity,
    unitPrice,
    newPrice,
    vName,
    isLoading: foodListingLoading,
    error: foodListingError,
  } = useSelector((state) => state.foodListing);

  // Fetch vendor details data when component mounts for vendor pages
  useEffect(() => {
    if (itemType === "vendor") {
      dispatch(getVendorDetails(itemId));
    }
  }, [dispatch, itemType, itemId]);

  // Fetch food listing details when component mounts for dish pages
  useEffect(() => {
    if (itemType === "dish" && itemId) {
      dispatch(fetchFoodListing(itemId));
    }

    // Cleanup function to clear food listing when component unmounts
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

    if (foodListingError) {
      return (
        <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Error Loading Dish
            </h2>
            <p className="text-gray-600 mb-4">{foodListingError}</p>
          </div>
        </div>
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
                  isFavourite ? "text-btnsGreen" : "text-paleBarkYellow"
                }`}
                // TODO: Add favorite logic if needed
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

              <Link
                to={`/CharityPage/vendor/${vendorId}`}
                className="flex items-center pt-1 underline text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg hover:text-green-700 transition-colors cursor-pointer">
                <img
                  src="/icons/person.svg"
                  alt="person"
                  className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                />
                {vName}
              </Link>

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
                <button className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-5 md:px-2 hover:bg-btnsGreen hover:text-white transition-colors">
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

  // Find the item from all categories for bag type
  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const item =
    itemType === "bag"
      ? bags.find((b, index) => {
          // Try to match by ID first, then by index
          const bagId = b.id || b.bagId || b._id || index;
          return bagId.toString() === itemId.toString();
        })
      : allDishes.find((d) => d.id === parseInt(itemId));

  if (!item) {
    return (
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            {itemType === "bag" ? "Magic Bag" : "Dish"} not found
          </h2>
          <p className="text-gray-600">
            The {itemType === "bag" ? "magic bag" : "dish"} you&apos;re looking
            for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Determine category for breadcrumb
  const getCategory = () => {
    if (itemType === "bag") return "magic bags";
    if (mainDishes.find((d) => d.id === parseInt(itemId))) return "main dishes";
    if (bakedGoods.find((d) => d.id === parseInt(itemId))) return "baked goods";
    if (dessert.find((d) => d.id === parseInt(itemId))) return "desserts";
    if (drinks.find((d) => d.id === parseInt(itemId))) return "drinks";
    return "food";
  };

  // Get the correct price fields based on item type
  const originalPrice = itemType === "bag" ? item.price : item.unitPrice;
  const discountedPrice = itemType === "bag" ? item.newPrice : item.newPrice;

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
          {/* Favorite Icon - only for dish and bag */}
          {(itemType === "dish" || itemType === "bag") && (
            <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
              <FavoriteOutlinedIcon
                className={`cursor-pointer text-lg mob470:text-xl text-paleBarkYellow`}
                // TODO: Add favorite logic if needed
              />
            </span>
          )}
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
              EGP{originalPrice}
            </span>
            <span className="text-btnsGreen text-xl mob470:text-2xl mob560:text-2xl md:text-3xl px-1 font-semibold">
              EGP{discountedPrice}
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
              {item.quantity} {itemType === "bag" ? "Bags" : "Pieces"}
            </span>

            <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
              <button className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-5 md:px-2 hover:bg-btnsGreen hover:text-white transition-colors">
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
              Total: <span>EGP {discountedPrice * 2}</span>
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
            `${item.name} is a delicious and high-quality ${
              itemType === "bag"
                ? "magic bag containing multiple items"
                : "dish"
            } prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent ${
              itemType === "bag" ? "bags" : "meals"
            } at discounted prices.`}
        </p>
        {itemType === "bag" && item.foods && item.foods.length > 0 && (
          <div className="mb-4">
            <p className="text-sm mob470:text-base mob560:text-base md:text-lg font-semibold text-lightBrownYellow">
              Contains:
            </p>
            <p className="text-sm mob470:text-base mob560:text-base md:text-lg text-darkgray">
              {item.foods.join(", ")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

DishInfo.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(["dish", "bag", "vendor"]),
  showShoppingCart: PropTypes.bool,
};

export default DishInfo;
