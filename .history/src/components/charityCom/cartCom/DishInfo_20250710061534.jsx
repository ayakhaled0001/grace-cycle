import BtnGreen from "../../Ui/BtnGreen";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  addToCart,
  toggleFavorite,
  addFoodListingToFavorites,
} from "../../../redux/FoodSlice";
import { toggleBagFavorite } from "../../../redux/BagsSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchFoodListing,
  clearFoodListing,
  updateFavoriteStatus,
} from "../../../redux/FoodListingSlice";
import { Skeleton } from "@mui/material";
import VendorInfoCard from "./VendorInfoCard";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { getVendorDetails } from "../../../redux/VendorDetailsSlice";

function DishInfo({ itemId, itemType = "dish", showShoppingCart = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const { mainDishes, bakedGoods, dessert, drinks, favoriteFoods } =
    useSelector((state) => state.servicesFood);
  const { bags } = useSelector((state) => state.bags);
  const {
    vendorDetails,
    isLoading: vendorLoading,
    error: vendorError,
  } = useSelector((state) => state.vendorDetails);
  const {
    id,
    name,
    picUrl,
    rating,
    unitPrice,
    newPrice,
    vName,
    vendorId,
    categories,
    description,
    vendorOpeningTime,
    vendorClosingTime,
    isLoading: foodListingLoading,
    error: foodListingError,
  } = useSelector((state) => state.foodListing);

  // State variables
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const isItemFavorited = favoriteFoods.some(
    (fav) => fav.id === parseInt(itemId)
  );

  // Helper functions
  const getCategory = () => {
    if (itemType === "bag") return "magic bags";
    if (categories?.length) return categories[0].toLowerCase();

    const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
    const item = allDishes.find((d) => d.id === parseInt(itemId));

    if (!item) return "food";
    if (mainDishes.includes(item)) return "main dishes";
    if (bakedGoods.includes(item)) return "baked goods";
    if (dessert.includes(item)) return "desserts";
    if (drinks.includes(item)) return "drinks";
    return "food";
  };

  const handleToggleFavorite = () => {
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
        isFav: !isItemFavorited,
      };

      dispatch(
        toggleFavorite({
          foodId: itemId,
          isCurrentlyFavorited: isItemFavorited,
        })
      );
      dispatch(
        updateFavoriteStatus({ foodId: itemId, isFavourite: !isItemFavorited })
      );

      if (!isItemFavorited) {
        dispatch(addFoodListingToFavorites(foodData));
      }
    } else if (itemType === "bag") {
      dispatch(
        toggleBagFavorite({
          bagId: itemId,
          isCurrentlyFavorited: isItemFavorited,
        })
      );
    } else {
      dispatch(
        toggleFavorite({
          foodId: itemId,
          isCurrentlyFavorited: isItemFavorited,
        })
      );
    }
  };

  // Data fetching effects
  useEffect(() => {
    if (itemType === "vendor") dispatch(getVendorDetails(itemId));
  }, [dispatch, itemType, itemId]);

  useEffect(() => {
    if (itemType === "dish" && itemId) {
      dispatch(fetchFoodListing(itemId));
    }

    return () => {
      if (itemType === "dish") dispatch(clearFoodListing());
    };
  }, [dispatch, itemType, itemId]);

  // Vendor rendering
  if (itemType === "vendor") {
    if (vendorLoading) return <VendorLoadingSkeleton />;
    if (vendorError) return <VendorError error={vendorError} />;
    if (!vendorDetails) return <VendorNotFound />;

    return (
      <>
        <Breadcrumb
          path={`Charity >> Vendors >> ${vendorDetails.displayName}`}
        />
        <VendorInfoCard vendor={vendorDetails} />
        <div className="py-4 mob470:py-5 mob560:py-5 px-6 lg:px-8">
          <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl mb-3">
            About {vendorDetails.displayName}
          </h4>
          <p className="text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed text-gray-700">
            {vendorDetails.description ||
              defaultVendorDescription(vendorDetails)}
          </p>
        </div>
      </>
    );
  }

  // Find item data
  const allDishes = [...mainDishes, ...bakedGoods, ...dessert, ...drinks];
  const item =
    itemType === "bag"
      ? bags.find(
          (b) => (b.id || b.bagId || b._id)?.toString() === itemId.toString()
        )
      : allDishes.find((d) => d.id === parseInt(itemId)) || {
          id,
          name,
          picUrl,
          rating,
          unitPrice,
          newPrice,
          vName,
          vendorId,
          description,
        };

  // Handle cases where item not found
  if (!item || !item.id) {
    return (
      <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            {itemType === "bag" ? "Magic Bag" : "Dish"} Not Found
          </h2>
          <p className="text-gray-600">
            The {itemType === "bag" ? "magic bag" : "dish"} you're looking for
            doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Quantity handlers
  const handleIncrement = () => {
    if (selectedQuantity < (item.quantity || 10)) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  // Add to cart handler
  const handleAddToCart = async () => {
    const payload = {
      vendorId: item.vendorId,
      item: {
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        unitPrice: item.unitPrice,
        newPrice: item.newPrice,
        quantity: selectedQuantity,
      },
      vendorName: item.vName || "Unknown Vendor",
    };

    setLoading(true);
    const result = await dispatch(addToCart(payload));
    setLoading(false);

    if (addToCart.fulfilled.match(result)) {
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: "Item added successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Render main content
  return (
    <>
      <Breadcrumb path={`Charity >> ${getCategory()} >> ${item.name}`} />

      <div
        className={`flex flex-col lg:flex-row justify-center gap-3 mob470:gap-4 mob560:gap-6 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8 ${
          showShoppingCart ? "" : "lg:justify-center"
        }`}>
        {/* Image Section */}
        <ImageSection
          item={item}
          isItemFavorited={isItemFavorited}
          handleToggleFavorite={handleToggleFavorite}
          showFavorite={itemType !== "vendor"}
          showShoppingCart={showShoppingCart}
        />

        {/* Info Section */}
        <InfoSection
          item={item}
          itemType={itemType}
          category={getCategory()}
          showShoppingCart={showShoppingCart}
          vendorId={item.vendorId}
        />

        {/* Cart Section */}
        {showShoppingCart && (
          <CartSection
            availableQuantity={item.quantity || 10}
            selectedQuantity={selectedQuantity}
            price={item.newPrice}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onAddToCart={handleAddToCart}
            loading={loading}
          />
        )}
      </div>

      {/* Description Section */}
      <div className="py-4 mob470:py-5 mob560:py-5 px-2 mob470:px-3 mob560:px-4 md:px-6 lg:px-8">
        <h4 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
          Description
        </h4>
        <p className="py-2 md:py-1 text-base mob470:text-lg mob560:text-lg md:text-xl leading-relaxed">
          {item.description || defaultDescription(item, itemType)}
        </p>
        {itemType === "bag" && item.foods?.length > 0 && (
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

// Helper components
const Breadcrumb = ({ path }) => (
  <p className="text-semilightGrey font-nunito py-2 mob470:py-3 mob560:py-3 md:py-5 px-2 mob470:px-3 mob560:px-4 md:px-0 text-xs mob470:text-sm mob560:text-sm md:text-base">
    {path}
  </p>
);

const VendorLoadingSkeleton = () => (
  <>
    <Breadcrumb path="Charity >> Vendors >> Loading..." />
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

const VendorError = ({ error }) => (
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

const VendorNotFound = () => (
  <div className="pt-20 lgHome:px-20 mob470:px-2 mob560:px-3 md:px-10 bg-bgBeigeWhite">
    <div className="text-center py-10">
      <h2 className="text-xl font-bold text-red-600 mb-4">Vendor Not Found</h2>
      <p className="text-gray-600">The vendor could not be found.</p>
    </div>
  </div>
);

const ImageSection = ({
  item,
  isItemFavorited,
  handleToggleFavorite,
  showFavorite,
  showShoppingCart,
}) => (
  <div
    className={`w-full ${
      showShoppingCart ? "lg:w-6/12" : "lg:w-5/12"
    } flex justify-center relative`}>
    {showFavorite && (
      <span className="shadow-xl rounded-full bg-semiDarkBeige p-2 mob470:p-3 absolute left-3 bottom-3 z-10">
        <FavoriteOutlinedIcon
          className={`cursor-pointer text-lg mob470:text-xl ${
            isItemFavorited ? "text-btnsGreen" : "text-paleBarkYellow"
          }`}
          onClick={handleToggleFavorite}
        />
      </span>
    )}
    <img
      src={item.picUrl}
      alt={item.name}
      className="w-full max-w-sm mob470:max-w-md mob560:max-w-md md:max-w-lg lg:max-w-none rounded-md h-56 mob470:h-64 mob560:h-64 md:h-72 lg:h-80 object-cover"
    />
  </div>
);

const InfoSection = ({ item, itemType, category, vendorId }) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const openingInfo =
    itemType === "dish"
      ? `${item.vendorOpeningTime} - ${item.vendorClosingTime}`
      : item.isOpen
      ? "Open"
      : "Closed";

  return (
    <div
      className={`w-full lg:w-4/12 px-0 mob470:px-1 mob560:px-2 md:px-4 space-y-3 mob470:space-y-3 mob560:space-y-4`}>
      <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
        {categoryName}
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
          EGP{item.unitPrice || item.price}
        </span>
        <span className="text-btnsGreen text-xl mob470:text-2xl mob560:text-2xl md:text-3xl px-1 font-semibold">
          EGP{item.newPrice}
        </span>
      </p>

      <div className="space-y-2 mob470:space-y-3 mob560:space-y-3">
        <h3 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl pt-2 mob470:pt-3 mob560:pt-4">
          Vendor
        </h3>

        {vendorId ? (
          <Link
            to={`/CharityPage/vendor/${vendorId}`}
            className="flex items-center pt-1 underline text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg hover:text-green-700 transition-colors cursor-pointer">
            <img
              src="/icons/person.svg"
              alt="person"
              className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
            />
            {item.vName}
          </Link>
        ) : (
          <div className="flex items-center pt-1 text-btnsGreen text-sm mob470:text-base mob560:text-base md:text-lg">
            <img
              src="/icons/person.svg"
              alt="person"
              className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
            />
            {item.vName}
          </div>
        )}

        <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
          <img
            src="/icons/clock.svg"
            alt="clock"
            className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
          />
          {openingInfo}
        </p>

        <p className="flex items-center pt-1 text-sm mob470:text-base mob560:text-base md:text-lg">
          <img
            src="/icons/send.svg"
            alt="location"
            className="w-3 mob470:w-4 mob560:w-4 text-center mr-2"
          />
          10 km away
        </p>
      </div>
    </div>
  );
};

const CartSection = ({
  availableQuantity,
  selectedQuantity,
  price,
  onIncrement,
  onDecrement,
  onAddToCart,
  loading,
}) => (
  <div className="w-full lg:w-3/12 p-3 mob470:p-4 mob560:p-4 md:p-6 border-2 border-lightBrownYellow rounded-lg mx-0 md:mx-5 space-y-3 mob470:space-y-4 mob560:space-y-4">
    <h1 className="text-lightBrownYellow font-semibold font-nunitoBold text-lg mob470:text-xl mob560:text-xl md:text-2xl">
      Available:
    </h1>
    <span className="text-base mob470:text-lg mob560:text-lg md:text-xl font-nunito">
      {availableQuantity} Pieces
    </span>

    <div className="flex items-center justify-around my-3 mob470:my-4 mob560:my-4">
      <button
        onClick={onDecrement}
        className="border-2 border-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:py-2 md:px-2 hover:bg-green-600 hover:text-white transition-colors">
        <img
          src="/icons/minus.svg"
          alt="discard item"
          className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
        />
      </button>
      <span className="text-lg mob470:text-xl mob560:text-xl md:text-2xl font-nunitoBold">
        {selectedQuantity}
      </span>
      <button
        onClick={onIncrement}
        className="border-2 border-btnsGreen bg-btnsGreen rounded-md p-2 mob470:p-3 mob560:p-3 md:p-2 hover:bg-green-600 transition-colors">
        <img
          src="/icons/add.svg"
          alt="add item"
          className="w-3 h-3 mob470:w-4 mob470:h-4 mob560:w-4 mob560:h-4 md:w-5 md:h-5"
        />
      </button>
    </div>
    {/*  */}
    <p className="font-nunito text-lg mob470:text-xl mob560:text-xl md:text-2xl border border-nescafe py-2 md:py-1 rounded-md px-2 md:px-1">
      Total: <span>EGP {(price * selectedQuantity).toFixed(2)}</span>
    </p>

    <button
      onClick={onAddToCart}
      className="text-sm mob470:text-base mob560:text-base md:text-lg py-2 mob470:py-3 mob560:py-3 md:py-2 bg-btnsGreen text-white w-full rounded-md my-4"
      disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  </div>
);

// Helper functions for default content
const defaultVendorDescription = (vendor) =>
  `${vendor.displayName} is a trusted ${
    vendor.vendorType || "vendor"
  } in our charity program, located in ${
    vendor.address
  }. They have earned a rating of ${vendor.rating}/5 and are open from ${
    vendor.opening
  } to ${vendor.closing}.`;

const defaultDescription = (item, itemType) =>
  `${item.name} is a high-quality ${
    itemType === "bag" ? "magic bag containing multiple items" : "dish"
  } prepared with fresh ingredients. Part of our charity program to reduce food waste.`;

DishInfo.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(["dish", "bag", "vendor"]),
  showShoppingCart: PropTypes.bool,
};

export default DishInfo;
