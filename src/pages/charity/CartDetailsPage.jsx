import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartDetails } from "../../redux/FoodSlice";
import { updateCartItem } from "../../redux/FoodSlice";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";

function CartDetailsPage() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.servicesFood);

  const [cartDetails, setCartDetails] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [unsaved, setUnsaved] = useState(false);
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
    setUnsaved(true);
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

  const handleDelete = (productId) => {
    // Handle delete functionality
    console.log("Delete product:", productId);
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
                  {cartDetails.items.map((product) => (
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
                            style={{ background: "#EEEADF", color: "#5b5e5b" }}
                          >
                            {product.available}+ left
                          </div>
                        </div>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
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
                            onClick={() => handleQuantityChange(product.id, 1)}
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
                  ))}
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
