import BtnGreen from "../../Ui/BtnGreen";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  addToCart,
  addBagToCartState,
  toggleFavorite,
  addFoodListingToFavorites,
} from "../../../redux/FoodSlice";
import { toggleBagFavorite } from "../../../redux/BagsSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { getVendorDetails } from "../../../redux/VendorDetailsSlice";
import {
  fetchFoodListing,
  clearFoodListing,
  updateFavoriteStatus,
} from "../../../redux/FoodListingSlice";
import { Skeleton } from "@mui/material";
import VendorInfoCard from "./VendorInfoCard";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

function DishInfo({ itemId, itemType = "dish", showShoppingCart = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const { favoriteFoods } = useSelector((state) => state.servicesFood);
  const isItemFavorited = favoriteFoods.some(
    (fav) => fav.id === parseInt(itemId)
  );

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch vendor details if needed
  useEffect(() => {
    if (itemType === "vendor") dispatch(getVendorDetails(itemId));
  }, [dispatch, itemType, itemId]);

  // Fetch food listing if needed
  useEffect(() => {
    if (itemType === "dish" && itemId) dispatch(fetchFoodListing(itemId));
    return () => {
      if (itemType === "dish") dispatch(clearFoodListing());
    };
  }, [dispatch, itemType, itemId]);

  // Favorite toggle handler
  const handleToggleFavorite = (itemId, isCurrentlyFavorited) => {
    if (itemType === "dish" && id) {
      const foodData = {
        id,
        name,
        picUrl,
        rating,
        unitPrice,
        newPrice,
        vName,
        vendorId,
        isFav: !isCurrentlyFavorited,
      };
      dispatch(toggleFavorite({ foodId: itemId, isCurrentlyFavorited }));
      dispatch(
        updateFavoriteStatus({
          foodId: itemId,
          isFavourite: !isCurrentlyFavorited,
        })
      );
      if (!isCurrentlyFavorited) dispatch(addFoodListingToFavorites(foodData));
    } else if (itemType === "bag") {
      dispatch(toggleBagFavorite({ bagId: itemId, isCurrentlyFavorited }));
    } else {
      dispatch(toggleFavorite({ foodId: itemId, isCurrentlyFavorited }));
    }
  };

  // Find the item from all categories for bag type
  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const fallbackItem =
    itemType === "bag"
      ? bags.find((b) => String(b.id || b.bagId || b._id) === itemId)
      : allDishes.find((d) => d.id === parseInt(itemId));
  const item = id
    ? {
        id,
        name,
        picUrl,
        rating,
        isFavourite: isItemFavorited,
        unitPrice,
        newPrice,
        quantity: fallbackItem?.quantity,
        vendorId,
        vName,
        isOpen: true,
      }
    : fallbackItem;

  // Handlers for increment/decrement
  const handleIncrement = () => {
    if (item && quantity < item.quantity) setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Add to Cart handler
  const handleAddToCart = async () => {
    if (!item) return;
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
        const bagPayload = {
          vendorId: item.vendorId || "cb5ba1ee-bb67-418e-aeda-8c628ddc58ff",
          bag: {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            unitPrice: item.unitPrice || item.price,
            newPrice: item.newPrice,
            quantity,
            foods: item.foods || ["falafel", "Foul", "Bread"],
          },
          vendorName: item.vName || "Vendor1",
        };
        await axios.post(
          "https://gracecycleapi.azurewebsites.net/api/webcart/add-bag",
          bagPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(addBagToCartState(item.id));
        Swal.fire({
          icon: "success",
          title: "Bag Added to Cart!",
          text: "This magic bag has been added to your cart successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/CharityPage/cart");
      } else {
        const payload = {
          vendorId: item.vendorId,
          item: {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            unitPrice: item.unitPrice,
            newPrice: item.newPrice,
            quantity,
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
          navigate("/CharityPage/cart");
        } else {
          throw new Error("Failed to add item to cart");
        }
      }
    } catch (error) {
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

  // Vendor loading/error states
  if (itemType === "vendor") {
    if (isLoading) {
      return (
        <>
          <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
            Charity &gt;&gt; Vendors &gt;&gt; Loading...
          </p>
          <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
            <div className="w-full lg:w-5/12 flex justify-center">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={320}
                className="rounded-md"
              />
            </div>
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
          <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-8">
            <div className="w-full lg:w-5/12 flex justify-center">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={320}
                className="rounded-md"
              />
            </div>
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
    if (foodListingError && !id) {
      // fallback to local data
      const localItem = allDishes.find((d) => d.id === parseInt(itemId));
      if (!localItem) {
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
      return (
        <>
          <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
            Charity &gt;&gt;{" "}
            {categories && categories.length > 0
              ? categories[0].toLowerCase()
              : "food"}{" "}
            &gt;&gt; {localItem.name}
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
              {/* Favorite Icon - only for dishes */}
              <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
                {isItemFavorited ? (
                  <FavoriteIcon
                    className="cursor-pointer text-lg mob470:text-xl text-btnsGreen"
                    onClick={() =>
                      handleToggleFavorite(localItem.id, isItemFavorited)
                    }
                  />
                ) : (
                  <FavoriteOutlinedIcon
                    className="cursor-pointer text-lg mob470:text-xl text-paleBarkYellow"
                    onClick={() =>
                      handleToggleFavorite(localItem.id, isItemFavorited)
                    }
                  />
                )}
              </span>
              <img
                src={localItem.picUrl}
                alt={localItem.name}
                className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
              />
            </div>
            {/* Info Section */}
            <div
              className={`w-full ${
                showShoppingCart ? "lg:w-4/12" : "lg:w-5/12"
              } px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-3 mob470:space-y-3 mob560:space-y-4`}>
              <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                {categories && categories.length > 0
                  ? categories[0].toLowerCase()
                  : "food"}
              </h1>
              <h2 className="flex flex-col sm:flex-row text-xl mob470:text-2xl mob560:text-2xl md:text-3xl py-1 gap-1 mob470:gap-2 mob560:gap-2">
                <span className="break-words">{localItem.name}</span>
                <span className="flex items-center text-base mob470:text-lg mob560:text-lg md:text-xl">
                  (
                  <img
                    src="/icons/star.svg"
                    alt="star"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-1"
                  />
                  {localItem.rating})
                </span>
              </h2>
              <p className="py-1 mob470:py-2 mob560:py-2">
                <span className="line-through text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                  EGP{localItem.unitPrice}
                </span>
                <span className="text-btnsGreen text-xl mob470:text-2xl mob560:text-2xl md:text-3xl px-1 font-semibold">
                  EGP{localItem.newPrice}
                </span>
              </p>
              <div className="space-y-2 mob470:space-y-3 mob560:space-y-3">
                <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl pt-2 mob470:pt-3 mob560:pt-4">
                  Vendor
                </h3>
                <Link
                  to={`/CharityPage/vendor/${localItem.vendorId}`}
                  className="flex items-center pt-1 underline text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg hover:text-green-700 transition-colors cursor-pointer">
                  <img
                    src="/icons/person.svg"
                    alt="person"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  {localItem.vName}
                </Link>
                <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
                  <img
                    src="/icons/clock.svg"
                    alt="clock"
                    className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
                  />
                  {localItem.isOpen ? "Open" : "Closed"}
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
            {/* Cart Section */}
            {showShoppingCart && (
              <div className="w-full lg:w-3/12 p-3 mob470:p-4 mob560:p-4 md:p-6 border-2 border-lightBrownYellow rounded-lg mx-0 md:mx-5 space-y-3 mob470:space-y-4 mob560:space-y-4">
                <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
                  Available:
                </h1>
                <span className="text-base mob470:text-lg mob560:text-lg md:text-xl font-nunito">
                  {localItem.quantity} Pieces
                </span>
                <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
                  <button
                    onClick={handleDecrement}
                    className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-2 md:px-2 hover:bg-green-600 hover:text-white transition-colors">
                    <img
                      src="/icons/minus.svg"
                      alt="discard item"
                      className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                    />
                  </button>
                  <span className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-nunitoBold">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:p-2 hover:bg-green-600 transition-colors">
                    <img
                      src="/icons/add.svg"
                      alt="add item"
                      className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                    />
                  </button>
                </div>
                <p className="font-nunito text-lg mob470:text-xl mob560:text-xl md:text-2xl border border-nescafe py-2 md:py-1 rounded-md px-2 md:px-1">
                  Total: <span>EGP {localItem.newPrice * quantity}</span>
                </p>
                <button
                  onClick={handleAddToCart}
                  disabled={loading || foodLoading}
                  className={`w-full rounded-md p-3 text-lg font-nunito ${
                    loading || foodLoading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-btnsGreen text-white hover:bg-green-700 transition-colors"
                  }`}>
                  {loading || foodLoading ? "Loading..." : "Add to Cart"}
                </button>
              </div>
            )}
          </div>
          <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
            <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              Description
            </h4>
            <p className="py-2 md:py-1 text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed">
              {localItem.description ||
                `${localItem.name} is a delicious and high-quality dish prepared with fresh ingredients. This item is part of our charity program to reduce food waste while providing you with excellent meals at discounted prices.`}
            </p>
          </div>
        </>
      );
    }
  }

  // If not found
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

  // Main render for found item
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
          {/* Favorite Icon - only for dishes */}
          {itemType === "dish" && (
            <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
              {isItemFavorited ? (
                <FavoriteIcon
                  className="cursor-pointer text-lg mob470:text-xl text-btnsGreen"
                  onClick={() => handleToggleFavorite(item.id, isItemFavorited)}
                />
              ) : (
                <FavoriteOutlinedIcon
                  className="cursor-pointer text-lg mob470:text-xl text-paleBarkYellow"
                  onClick={() => handleToggleFavorite(item.id, isItemFavorited)}
                />
              )}
            </span>
          )}
          <img
            src={item.picUrl}
            alt={item.name}
            className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
          />
        </div>
        {/* Info Section */}
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
        {/* Cart Section */}
        {showShoppingCart && (
          <div className="w-full lg:w-3/12 p-3 mob470:p-4 mob560:p-4 md:p-6 border-2 border-lightBrownYellow rounded-lg mx-0 md:mx-5 space-y-3 mob470:space-y-4 mob560:space-y-4">
            <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
              Available:
            </h1>
            <span className="text-base mob470:text-lg mob560:text-lg md:text-xl font-nunito">
              {item.quantity} Pieces
            </span>
            <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
              <button
                onClick={handleDecrement}
                className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-2 md:px-2 hover:bg-green-600 hover:text-white transition-colors">
                <img
                  src="/icons/minus.svg"
                  alt="discard item"
                  className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                />
              </button>
              <span className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-nunitoBold">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:p-2 hover:bg-green-600 transition-colors">
                <img
                  src="/icons/add.svg"
                  alt="add item"
                  className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
                />
              </button>
            </div>
            <p className="font-nunito text-lg mob470:text-xl mob560:text-xl md:text-2xl border border-nescafe py-2 md:py-1 rounded-md px-2 md:px-1">
              Total: <span>EGP {Math.ceil(discountedPrice * quantity)}</span>
            </p>
            <button
              onClick={handleAddToCart}
              disabled={loading || foodLoading || cartBags.includes(item.id)}
              className={`w-full rounded-md p-3 text-lg font-nunito ${
                loading || foodLoading || cartBags.includes(item.id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-btnsGreen text-white hover:bg-green-700 transition-colors"
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
