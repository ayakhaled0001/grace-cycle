import BtnGreen from "../../Ui/BtnGreen";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { addToCart, addBagToCartState } from "../../../redux/FoodSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getVendorDetails } from "../../../redux/VendorDetailsSlice";
import {
  fetchFoodListing,
  clearFoodListing,
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
    isFavourite,
    unitPrice,
    newPrice,
    vName,
    isLoading: foodListingLoading,
    error: foodListingError,
  } = useSelector((state) => state.foodListing);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

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
        isFavourite,
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
        }`}
      >
        {/* Image */}
        <div
          className={`w-full ${
            showShoppingCart ? "lg:w-6/12" : "lg:w-5/12"
          } flex justify-center relative`}
        >
          <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
            <FavoriteOutlinedIcon
              className={`cursor-pointer text-lg mob470:text-xl ${
                item.isFavourite ? "text-btnsGreen" : "text-paleBarkYellow"
              }`}
            />
          </span>
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
          } px-2 space-y-4`}
        >
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
            className="underline text-btnsGreen hover:text-green-700"
          >
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
                className="border-2 border-btnsGreen rounded-md p-2 hover:bg-btnsGreen hover:text-white"
              >
                <img src="/icons/minus.svg" alt="-" className="w-4 h-4" />
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 hover:bg-green-600"
              >
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
              }`}
            >
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

DishInfo.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(["dish", "bag", "vendor"]),
  showShoppingCart: PropTypes.bool,
};

export default DishInfo;
