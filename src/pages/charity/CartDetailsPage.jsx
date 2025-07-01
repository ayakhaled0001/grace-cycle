import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";

function CartDetailsPage() {
  const { restaurantId } = useParams();
  const [quantities, setQuantities] = useState({
    1: 3,
    2: 1,
    3: 2,
    4: 1,
  });
  const [productsOpen, setProductsOpen] = useState(true);
  const [bagsOpen, setBagsOpen] = useState(true);

  // Mock data for the selected restaurant
  const restaurantData = {
    1: { name: "Restaurant Al-Ahly", products: 2, bags: 1 },
    2: { name: "Restaurant Al-Zamalek", products: 3, bags: 2 },
    3: { name: "Restaurant Al-Masry", products: 1, bags: 1 },
    4: { name: "Restaurant Al-Ismaily", products: 2, bags: 1 },
  };

  const restaurant = restaurantData[restaurantId] || restaurantData[1];

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Grilled Chicken",
      price: 45,
      image: "/homeMedia/salad.png",
      quantity: quantities[1],
    },
    {
      id: 2,
      name: "Beef Burger",
      price: 35,
      image: "/homeMedia/salad.png",
      quantity: quantities[2],
    },
    {
      id: 3,
      name: "Pasta Carbonara",
      price: 55,
      image: "/homeMedia/salad.png",
      quantity: quantities[3],
    },
    {
      id: 4,
      name: "Caesar Salad",
      price: 25,
      image: "/homeMedia/salad.png",
      quantity: quantities[4],
    },
  ];

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + change),
    }));
  };

  const handleDelete = (productId) => {
    // Handle delete functionality
    console.log("Delete product:", productId);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * quantities[product.id];
    }, 0);
  };

  const productsTotal = calculateTotal();
  const bagsTotal = 50; // Mock bag price
  const total = productsTotal + bagsTotal;

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
              {restaurant.name}
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
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="pb-4 mb-4 border-b-2 border-[#A6A6A6] border-dashed"
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                        {/* Product Image */}
                        <img
                          src={product.image}
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
                              EGP 160
                            </span>
                            <span
                              className="font-bold text-base sm:text-lg"
                              style={{ color: "#225A4B" }}
                            >
                              EGP 136
                            </span>
                          </div>
                          <div
                            className="inline-block px-2 py-1 rounded-md text-xs font-semibold mb-2 sm:mb-0"
                            style={{ background: "#EEEADF", color: "#5b5e5b" }}
                          >
                            5+ left
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
                </div>
              )}
            </div>

            {/* Bags Accordion */}
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
                  <div className="pb-4 mb-4 border-b-2 border-[#A6A6A6] border-dashed">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                      {/* Bag Image */}
                      <img
                        src="/services/magicbags.png"
                        alt="Magic Bag"
                        className="w-24 h-16 sm:w-32 sm:h-20 object-cover rounded-lg mb-2 sm:mb-0"
                      />
                      {/* Bag Info */}
                      <div className="flex-1 min-w-0 w-full flex flex-col items-center sm:items-start">
                        <div className="font-bold text-black text-base sm:text-lg mb-1 text-center sm:text-left">
                          Magic Bag
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-bold text-base sm:text-lg"
                            style={{ color: "#225A4B" }}
                          >
                            EGP 50
                          </span>
                        </div>
                        <div
                          className="inline-block px-2 py-1 rounded-md text-xs font-semibold mb-2 sm:mb-0"
                          style={{ background: "#EEEADF", color: "#5b5e5b" }}
                        >
                          2+ left
                        </div>
                      </div>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                        <button
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
                          1
                        </span>
                        <button className="w-8 h-8 sm:w-9 sm:h-9 border-2 rounded-md flex items-center justify-center text-base sm:text-lg font-bold bg-[#225A4B] text-white">
                          +
                        </button>
                      </div>
                      {/* Delete Icon */}
                      <button
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
                </div>
              )}
            </div>
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
                    Products ({restaurant.products})
                  </span>
                  <span className="font-semibold">EGP {productsTotal}</span>
                </div>

                {/* Bags */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    Bags ({restaurant.bags})
                  </span>
                  <span className="font-semibold">EGP {bagsTotal}</span>
                </div>

                {/* Divider */}
                <hr className="border-gray-300" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-nunitoBold text-gray-800">
                    Total
                  </span>
                  <span className="text-xl font-nunitoBold text-btnsGreen">
                    EGP {total}
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
