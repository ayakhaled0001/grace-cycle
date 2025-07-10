import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../../redux/FoodSlice";
import HomeFooter from "../../components/homeCom/HomeFooter";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const { loading, error } = useSelector((state) => state.servicesFood);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const resultAction = await dispatch(fetchUserCart());
      if (fetchUserCart.fulfilled.match(resultAction)) {
        // Group cart items by vendorId to avoid duplicates2
        const rawCartData = resultAction.payload;
        const groupedCart = {};

        rawCartData.forEach((item) => {
          const vendorId = item.vendorId;
          if (!groupedCart[vendorId]) {
            groupedCart[vendorId] = {
              vendorId: item.vendorId,
              vendorName: item.vendorName,
              createdAt: item.createdAt,
              itemsCount: 0,
              itemsTotal: 0,
              bagsCount: 0,
              bagsTotal: 0,
            };
          }

          // Add items count and total1
          if (item.itemsCount > 0) {
            groupedCart[vendorId].itemsCount += item.itemsCount;
            groupedCart[vendorId].itemsTotal += item.itemsTotal || 0;
          }

          // Add bags count and total
          if (item.bagsCount > 0) {
            groupedCart[vendorId].bagsCount += item.bagsCount;
            groupedCart[vendorId].bagsTotal += item.bagsTotal || 0;
          }
        });

        // Convert grouped data back to array
        const uniqueCartItems = Object.values(groupedCart);
        setCartItems(uniqueCartItems);
      }
    };
    fetchCart();
  }, [dispatch]);

  // Mock data for cart items
  const handleItemClick = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleContinue = () => {
    if (selectedItems.length > 0) {
      // Navigate to detailed cart page with selected restaurant
      const selectedRestaurant = cartItems.find((item) =>
        selectedItems.includes(item.vendorId)
      );
      navigate(`/CharityPage/cart/details/${selectedRestaurant.vendorId}`);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-bgBeigeWhite">
      {/* <HomeNav backgroundColor="bg-[#EEEADF]" /> */}

      <div className="pt-10 px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-black text-2xl md:text-3xl font-nunitoBold">
            Your Cart
          </h1>
          <p className="text-[#000000CC] text-md md:text-lg">
            Select the one you want to see its contents
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-lg">Loading your cart...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg">Error loading cart: {error}</p>
          </div>
        )}

        {/* Empty Cart State */}
        {!loading && !error && cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            {/* Empty Cart Icon */}
            <div className="mb-6">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400">
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
                className="px-8 py-4 bg-btnsGreen text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
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
        )}

        {/* Cart Items Container */}
        {!loading && !error && cartItems.length > 0 && (
          <div className="mx-auto lg:w-[80%] w-[95%]">
            <div className="w-full mx-auto space-y-4 ">
              {cartItems.map((item) => (
                <div
                  key={item.vendorId}
                  className={`w-full p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedItems.includes(item.vendorId)
                      ? "border-4 border-btnsGreen"
                      : "border border-btnsGreen"
                  } bg-paleWhiteGrey`}
                  onClick={() => handleItemClick(item.vendorId)}>
                  {/* First Row - Restaurant Name and Date */}
                  <div className="flex flex-row justify-content items-center mb-3 gap-2">
                    <h2 className="text-md md:text-lg lg:text-xl font-nunitoBold leading-none">
                      {item.vendorName}
                    </h2>
                    <span className="text-base md:text-lg font-semibold text-[#00000099]">
                      ({formatDate(item.createdAt)})
                    </span>
                  </div>

                  {/* Second Row - Items Count and Total */}
                  {item.itemsCount > 0 && (
                    <div className="flex flex-row justify-between items-center gap-2">
                      <div
                        className="px-3 py-1 rounded-md text-white text-sm font-semibold w-fit"
                        style={{ backgroundColor: "#3F7D6C" }}>
                        {item.itemsCount} items
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src="/icons/money.svg"
                          alt="money icon"
                          width="20"
                          height="20"
                        />
                        <span
                          className="text-base md:text-md font-semibold"
                          style={{ color: "#3F7D6C" }}>
                          total: EGP
                          <span className="text-xl font-nunitoBold">
                            {" "}
                            {item.itemsTotal}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Third Row - Bags Count and Total */}
                  {item.bagsCount > 0 && (
                    <div className="flex flex-row justify-between items-center gap-2 mt-2">
                      <div
                        className="px-3 py-1 rounded-md text-white text-sm font-semibold w-fit"
                        style={{ backgroundColor: "#624C04" }}>
                        {item.bagsCount} bags
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src="/icons/money.svg"
                          alt="money icon"
                          width="20"
                          height="20"
                        />
                        <span
                          className="text-base md:text-md font-semibold"
                          style={{ color: "#624C04" }}>
                          total: EGP
                          <span className="text-xl font-nunitoBold">
                            {" "}
                            {item.bagsTotal}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center mt-8 mb-8">
              <button
                onClick={handleContinue}
                disabled={selectedItems.length === 0}
                className={`w-full lg:w-[50%] py-2 px-4 text-md md:text-lg lg:text-xl rounded-md font-semibold transition-all duration-300 ${
                  selectedItems.length === 0
                    ? "bg-btnsGreen text-white opacity-50 cursor-not-allowed"
                    : "bg-btnsGreen text-white hover:bg-green-900 opacity-100"
                }`}>
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      <HomeFooter />
    </div>
  );
}

export default CartPage;
