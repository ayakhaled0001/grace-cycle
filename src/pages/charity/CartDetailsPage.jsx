import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartDetails,
  updateCartItem,
  setCartBags,
  removeBagFromCartState,
} from "../../redux/FoodSlice";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";
import axios from "axios";
import Swal from "sweetalert2";

function CartDetailsPage() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.servicesFood);

  const [cartDetails, setCartDetails] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [unsaved, setUnsaved] = useState(false);
  const [bagsUnsaved, setBagsUnsaved] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const [bagsOpen, setBagsOpen] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const resultAction = await dispatch(fetchCartDetails(restaurantId));
      if (fetchCartDetails.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        setCartDetails(data);
        // Initialize quantities from backend data
        const initialQuantities = {};
        data.items.forEach((item) => {
          initialQuantities[item.id] = item.quantity;
        });
        data.bags.forEach((bag) => {
          initialQuantities[`bag_${bag.id}`] = bag.quantity;
        });
        setQuantities(initialQuantities);

        // Update cartBags state with bags from backend
        const bagIds = data.bags.map((bag) => bag.id);
        dispatch(setCartBags(bagIds));
      }
    };
    fetchDetails();
  }, [dispatch, restaurantId]);

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const updatedQuantity = Math.max(1, (prev[productId] || 1) + change);
      return {
        ...prev,
        [productId]: updatedQuantity,
      };
    });

    // Check if it's a bag or product and update appropriate state
    if (typeof productId === "string" && productId.startsWith("bag_")) {
      setBagsUnsaved(true);
    } else {
      setUnsaved(true);
    }
  };

  const handleSaveChanges = async () => {
    // Prepare and send update requests for all changed items and bags
    let updatePromises = [];
    // Items
    cartDetails.items.forEach((item) => {
      if (quantities[item.id] !== item.quantity) {
        updatePromises.push(
          dispatch(
            updateCartItem({
              vendorId: cartDetails.vendorId,
              item: { ...item, quantity: quantities[item.id] },
            })
          )
        );
      }
    });
    // Bags
    cartDetails.bags.forEach((bag) => {
      if (quantities[`bag_${bag.id}`] !== bag.quantity) {
        updatePromises.push(
          dispatch(
            updateCartItem({
              vendorId: cartDetails.vendorId,
              item: { ...bag, quantity: quantities[`bag_${bag.id}`] },
            })
          )
        );
      }
    });
    if (updatePromises.length > 0) {
      const results = await Promise.all(updatePromises);
      // Use the last response to update cartDetails (assuming backend returns full cart)
      const lastSuccess = results
        .reverse()
        .find((r) => updateCartItem.fulfilled.match(r));
      if (lastSuccess) {
        setCartDetails(lastSuccess.payload);
        // Update local quantities to match backend
        const newQuantities = {};
        lastSuccess.payload.items.forEach((item) => {
          newQuantities[item.id] = item.quantity;
        });
        lastSuccess.payload.bags.forEach((bag) => {
          newQuantities[`bag_${bag.id}`] = bag.quantity;
        });
        setQuantities(newQuantities);
      }
    }
    setUnsaved(false);
  };

  const handleSaveBagsChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in to save changes",
        showConfirmButton: true,
      });
      return;
    }

    try {
      // Prepare and send update requests for all changed bags
      let updatePromises = [];

      cartDetails.bags.forEach((bag) => {
        if (quantities[`bag_${bag.id}`] !== bag.quantity) {
          const bagPayload = {
            vendorId: cartDetails.vendorId,
            bag: {
              id: bag.id,
              name: bag.name,
              picUrl: bag.picUrl,
              unitPrice: bag.unitPrice || bag.price,
              newPrice: bag.newPrice,
              quantity: quantities[`bag_${bag.id}`],
              foods: bag.foods || ["falafel", "Foul", "Bread"],
            },
          };

          updatePromises.push(
            axios.put(
              "https://gracecycleapi.azurewebsites.net/api/webcart/update-bag",
              bagPayload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            )
          );
        }
      });

      if (updatePromises.length > 0) {
        const results = await Promise.all(updatePromises);
        console.log(
          "Bags update results:",
          results.map((r) => r.data)
        );

        // Re-fetch cart details to ensure UI is in sync with backend
        const resultAction = await dispatch(fetchCartDetails(restaurantId));
        if (fetchCartDetails.fulfilled.match(resultAction)) {
          const data = resultAction.payload;
          setCartDetails(data);
          // Update quantities
          const newQuantities = {};
          data.items.forEach((item) => {
            newQuantities[item.id] = item.quantity;
          });
          data.bags.forEach((bag) => {
            newQuantities[`bag_${bag.id}`] = bag.quantity;
          });
          setQuantities(newQuantities);
        }

        Swal.fire({
          icon: "success",
          title: "Bags Updated!",
          text: "Your bag quantities have been updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(
        "Save bags changes error:",
        error.response?.data || error.message
      );

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update bag quantities",
        showConfirmButton: true,
      });
    }

    setBagsUnsaved(false);
  };

  const handleDelete = async (productId) => {
    try {
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

      // Check if it's a bag or product
      if (typeof productId === "string" && productId.startsWith("bag_")) {
        // It's a bag - find the bag
        const bagId = productId.replace("bag_", "");
        const bag = cartDetails.bags.find((b) => b.id === parseInt(bagId));

        if (!bag) {
          console.error("Bag not found in cart");
          return;
        }

        const bagPayload = {
          vendorId: cartDetails.vendorId,
          bag: {
            id: bag.id,
            name: bag.name,
            picUrl: bag.picUrl,
            unitPrice: bag.unitPrice || bag.price,
            newPrice: bag.newPrice,
            quantity: 0,
            foods: bag.foods || ["falafel", "Foul", "Bread"],
          },
        };

        const response = await axios.put(
          "https://gracecycleapi.azurewebsites.net/api/webcart/update-bag",
          bagPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Delete bag response:", response.data);
        console.log("Deleting bagId:", bagId);

        // Update local state to remove the deleted bag
        setCartDetails((prevCart) => {
          const updatedCart = { ...prevCart };
          updatedCart.bags = updatedCart.bags.filter(
            (b) => b.id !== parseInt(bagId)
          );
          console.log("Updated cart after bag deletion:", updatedCart);
          return updatedCart;
        });

        // Update cartBags state
        dispatch(removeBagFromCartState(parseInt(bagId)));
        // Reset bags unsaved state since bag is deleted
        setBagsUnsaved(false);
      } else {
        // It's a product - find the product
        const product = cartDetails.items.find((item) => item.id === productId);

        if (!product) {
          console.error("Product not found in cart");
          return;
        }

        const payload = {
          vendorId: cartDetails.vendorId,
          item: {
            id: product.id,
            name: product.name,
            picUrl: product.picUrl,
            unitPrice: product.unitPrice,
            newPrice: product.newPrice,
            quantity: 0,
          },
          vendorName: cartDetails.vendorName,
        };

        const response = await axios.put(
          "https://gracecycleapi.azurewebsites.net/api/webcart/update-item",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Delete product response:", response.data);
        console.log(
          "Deleting productId:",
          productId,
          "Type:",
          typeof productId
        );

        // Update local state to remove the deleted product
        setCartDetails((prevCart) => {
          const updatedCart = { ...prevCart };
          const productIdToRemove =
            typeof productId === "string" ? parseInt(productId) : productId;
          updatedCart.items = updatedCart.items.filter(
            (item) => item.id !== productIdToRemove
          );
          console.log("Updated cart after product deletion:", updatedCart);
          return updatedCart;
        });
      }

      // Remove from quantities state
      setQuantities((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });

      Swal.fire({
        icon: "success",
        title: "Item removed from cart!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Re-fetch cart details to ensure UI is in sync with backend
      const resultAction = await dispatch(fetchCartDetails(restaurantId));
      if (fetchCartDetails.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        setCartDetails(data);
        // Update quantities
        const newQuantities = {};
        data.items.forEach((item) => {
          newQuantities[item.id] = item.quantity;
        });
        data.bags.forEach((bag) => {
          newQuantities[`bag_${bag.id}`] = bag.quantity;
        });
        setQuantities(newQuantities);
      }
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to remove item from cart",
        showConfirmButton: true,
      });
    }
  };

  // Calculate totals from backend data
  const calculateItemsTotal = () => {
    if (!cartDetails) return 0;
    return cartDetails.items.reduce((total, item) => {
      return total + item.newPrice * quantities[item.id];
    }, 0);
  };

  const calculateBagsTotal = () => {
    if (!cartDetails) return 0;
    return cartDetails.bags.reduce((total, bag) => {
      return total + bag.newPrice * quantities[`bag_${bag.id}`];
    }, 0);
  };

  const productsTotal = calculateItemsTotal();
  const bagsTotal = calculateBagsTotal();
  const total = productsTotal + bagsTotal;

  // Helper to format numbers: if integer, no decimals; else, two decimals
  const format2 = (num) => {
    const n = Number(num);
    return Number.isInteger(n) ? n : n.toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading cart details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Error loading cart details: {error}
        </p>
      </div>
    );
  }

  if (!cartDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">No cart details found</p>
      </div>
    );
  }

  // Check if cart is empty (no items and no bags)
  const isCartEmpty =
    (!cartDetails.items || cartDetails.items.length === 0) &&
    (!cartDetails.bags || cartDetails.bags.length === 0);

  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-bgBeigeWhite">
        <div className="py-20 px-4 md:px-8 lg:px-16">
          {/* Header with breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Link
                to="/CharityPage/cart"
                className="text-gray-600 hover:text-btnsGreen"
              >
                Your Cart
              </Link>
              <span className="text-gray-400">››</span>
              <span className="text-btnsGreen font-semibold">
                {cartDetails.vendorName || "Cart Details"}
              </span>
            </div>
          </div>

          {/* Empty Cart Message */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            {/* Empty Cart Icon */}
            <div className="mb-6">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Empty Cart Text */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover amazing food and magic bags!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/CharityPage"
                className="px-8 py-4 bg-btnsGreen text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 md:px-8 lg:px-16">
        {/* Header with breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Link
              to="/CharityPage/cart"
              className="text-gray-600 hover:text-btnsGreen"
            >
              Your Cart
            </Link>
            <span className="text-gray-400">››</span>
            <span className="text-btnsGreen font-semibold">
              {cartDetails.vendorName}
            </span>
          </div>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Products Accordion */}
          <div className="space-y-4 lg:col-span-2">
            {/* Products Accordion */}
            <div className="bg-white rounded-t-lg border border-gray-200">
              <div
                className="p-4  flex items-center justify-between cursor-pointer select-none"
                style={{
                  background: "#EFF0E9",
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
                onClick={() => setProductsOpen((prev) => !prev)}
              >
                <h3 className="text-lg font-nunitoBold text-black font-bold flex items-center gap-2">
                  Products
                  <span
                    className={`transition-transform duration-200 ${
                      productsOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 6L13 10L7 14V6Z" fill="#225A4B" />
                    </svg>
                  </span>
                </h3>
              </div>
              {productsOpen && (
                <div className="p-4 transition-all duration-300 ease-in-out font-nunitoBold">
                  {cartDetails.items.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-400 mx-auto"
                        >
                          <path
                            d="M12 2L2 7L12 12L22 7L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 17L12 22L22 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12L12 17L22 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No products in cart
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Add some delicious food items to your cart!
                      </p>
                      <Link
                        to="/CharityPage"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-btnsGreen text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5V19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    cartDetails.items.map((product) => (
                      <div
                        key={product.id}
                        className="pb-4 mb-4 border-b-2 border-[#A6A6A6] border-dashed"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                          {/* Product Image */}
                          <img
                            src={product.picUrl}
                            alt={product.name}
                            className="w-24 h-16 sm:w-32 sm:h-20 object-cover rounded-lg mb-2 sm:mb-0"
                          />
                          {/* Product Info */}
                          <div className="flex-1 min-w-0 w-full flex flex-col items-center sm:items-start">
                            <div className="font-bold text-black text-base sm:text-lg mb-1 text-center sm:text-left">
                              {product.name}
                            </div>
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-1 sm:gap-2 mb-1">
                              <span className="line-through text-gray-500 text-xs sm:text-sm">
                                EGP {product.unitPrice}
                              </span>
                              <span
                                className="font-bold text-base sm:text-lg"
                                style={{ color: "#225A4B" }}
                              >
                                EGP {product.newPrice}
                              </span>
                            </div>
                            <div
                              className="inline-block px-2 py-1 rounded-md text-xs font-semibold mb-2 sm:mb-0"
                              style={{
                                background: "#EEEADF",
                                color: "#5b5e5b",
                              }}
                            >
                              {product.available}+ left
                            </div>
                          </div>
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                            <button
                              onClick={() =>
                                handleQuantityChange(product.id, -1)
                              }
                              className="w-8 h-8 sm:w-9 sm:h-9 border-2 rounded-md flex items-center justify-center text-base sm:text-lg font-bold"
                              style={{
                                borderColor: "#225A4B",
                                color: "#225A4B",
                                background: "#fff",
                              }}
                            >
                              –
                            </button>
                            <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md font-bold text-base sm:text-lg">
                              {quantities[product.id]}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(product.id, 1)
                              }
                              className="w-8 h-8 sm:w-9 sm:h-9 border-2 rounded-md flex items-center justify-center text-base sm:text-lg font-bold bg-[#225A4B] text-white"
                            >
                              +
                            </button>
                          </div>
                          {/* Delete Icon */}
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md ml-0 sm:ml-2 mt-2 sm:mt-0"
                            style={{ background: "#fff" }}
                          >
                            <img
                              src="/icons/delete.svg"
                              alt="delete icon"
                              width="18"
                              height="18"
                              className="sm:w-[20px] sm:h-[20px]"
                            />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Save Changes Button inside Products Accordion, after products list */}
                  <div
                    className={`transition-all duration-300 ${
                      unsaved
                        ? "max-h-20 opacity-100 mt-2"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <button
                      onClick={handleSaveChanges}
                      className="w-full py-2 bg-btnsGreen text-white rounded-md font-semibold hover:bg-green-900 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bags Accordion */}
            {cartDetails.bags.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                  style={{
                    background: "#EFF0E9",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                  }}
                  onClick={() => setBagsOpen((prev) => !prev)}
                >
                  <h3 className="text-lg font-nunitoBold text-black font-bold flex items-center gap-2">
                    Bags
                    <span
                      className={`transition-transform duration-200 ${
                        bagsOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 6L13 10L7 14V6Z" fill="#225A4B" />
                      </svg>
                    </span>
                  </h3>
                </div>
                {bagsOpen && (
                  <div className="p-4 transition-all duration-300 ease-in-out font-nunitoBold">
                    {cartDetails.bags.map((bag) => (
                      <div
                        key={bag.id}
                        className="pb-4 mb-4 border-b-2 border-[#A6A6A6] border-dashed"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                          {/* Bag Image */}
                          <img
                            src={bag.picUrl}
                            alt="Magic Bag"
                            className="w-24 h-16 sm:w-32 sm:h-20 object-cover rounded-lg mb-2 sm:mb-0"
                          />
                          {/* Bag Info */}
                          <div className="flex-1 min-w-0 w-full flex flex-col items-center sm:items-start">
                            <div className="font-bold text-black text-base sm:text-lg mb-1 text-center sm:text-left">
                              {bag.name}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              Contains: {bag.foods.join(", ")}
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="font-bold text-base sm:text-lg"
                                style={{ color: "#225A4B" }}
                              >
                                EGP {bag.newPrice}
                              </span>
                            </div>
                            <div
                              className="inline-block px-2 py-1 rounded-md text-xs font-semibold mb-2 sm:mb-0"
                              style={{
                                background: "#EEEADF",
                                color: "#5b5e5b",
                              }}
                            >
                              {bag.available}+ left
                            </div>
                          </div>
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                            <button
                              onClick={() =>
                                handleQuantityChange(`bag_${bag.id}`, -1)
                              }
                              className="w-8 h-8 sm:w-9 sm:h-9 border-2 rounded-md flex items-center justify-center text-base sm:text-lg font-bold"
                              style={{
                                borderColor: "#225A4B",
                                color: "#225A4B",
                                background: "#fff",
                              }}
                            >
                              –
                            </button>
                            <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md font-bold text-base sm:text-lg">
                              {quantities[`bag_${bag.id}`]}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(`bag_${bag.id}`, 1)
                              }
                              className="w-8 h-8 sm:w-9 sm:h-9 border-2 rounded-md flex items-center justify-center text-base sm:text-lg font-bold bg-[#225A4B] text-white"
                            >
                              +
                            </button>
                          </div>
                          {/* Delete Icon */}
                          <button
                            onClick={() => handleDelete(`bag_${bag.id}`)}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md ml-0 sm:ml-2 mt-2 sm:mt-0"
                            style={{ background: "#fff" }}
                          >
                            <img
                              src="/icons/delete.svg"
                              alt="delete icon"
                              width="18"
                              height="18"
                              className="sm:w-[20px] sm:h-[20px]"
                            />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Save Changes Button inside Bags Accordion, after bags list */}
                    <div
                      className={`transition-all duration-300 ${
                        bagsUnsaved
                          ? "max-h-20 opacity-100 mt-2"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <button
                        onClick={handleSaveBagsChanges}
                        className="w-full py-2 bg-btnsGreen text-white rounded-md font-semibold hover:bg-green-900 transition-colors"
                      >
                        Save Bags Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-[#EEEADF] rounded-lg p-6">
              <h3 className="text-xl font-nunitoBold text-gray-800 mb-4">
                Payment Summary
              </h3>

              <div className="space-y-4">
                {/* Products */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Products ({cartDetails.items.length})
                  </span>
                  <span className="font-semibold">
                    EGP {format2(productsTotal)}
                  </span>
                </div>

                {/* Bags */}
                {cartDetails.bags.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Bags ({cartDetails.bags.length})
                    </span>
                    <span className="font-semibold">
                      EGP {format2(bagsTotal)}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <hr className="border-gray-300" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-nunitoBold text-gray-800">
                    Total
                  </span>
                  <span className="text-xl font-nunitoBold text-btnsGreen">
                    EGP {format2(total)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full py-3 bg-btnsGreen text-white rounded-md font-semibold hover:bg-green-900 transition-colors">
                  Checkout
                </button>
                <button className="w-full py-3 bg-transparent text-btnsGreen border border-btnsGreen rounded-md font-semibold hover:bg-btnsGreen hover:text-white transition-colors">
                  Add Items
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default CartDetailsPage;
