import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";

function CartPage() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data for cart items
  const cartItems = [
    {
      id: 1,
      restaurantName: "Restaurant Al-Ahly",
      date: "5/31/25",
      items: 4,
      total: 200,
      bgColor: "#3F7D6C",
      moneyIconColor: "#3F7D6C",
    },
    {
      id: 2,
      restaurantName: "Restaurant Al-Zamalek",
      date: "5/31/25",
      items: 16,
      total: 400,
      bgColor: "#624C04",
      moneyIconColor: "#624C04",
    },
    {
      id: 3,
      restaurantName: "Restaurant Al-Masry",
      date: "5/31/25",
      items: 4,
      total: 200,
      bgColor: "#3F7D6C",
      moneyIconColor: "#3F7D6C",
    },
    {
      id: 4,
      restaurantName: "Restaurant Al-Ismaily",
      date: "5/31/25",
      items: 4,
      total: 200,
      bgColor: "#3F7D6C",
      moneyIconColor: "#3F7D6C",
    },
  ];

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
        selectedItems.includes(item.id)
      );
      navigate(`/CharityPage/cart/details/${selectedRestaurant.id}`);
    }
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

        {/* Cart Items Container */}
        <div className="mx-auto lg:w-[80%] w-[95%]">
          <div className="w-full mx-auto space-y-4 ">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`w-full p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedItems.includes(item.id)
                    ? "border-4 border-btnsGreen"
                    : "border border-btnsGreen"
                } bg-paleWhiteGrey`}
                onClick={() => handleItemClick(item.id)}
              >
                {/* First Row - Restaurant Name and Date */}
                <div className="flex flex-row justify-content items-center mb-3 gap-2">
                  <h2 className="text-md md:text-lg lg:text-xl font-nunitoBold leading-none">
                    {item.restaurantName}
                  </h2>
                  <span className="text-base md:text-lg font-semibold text-[#00000099]">
                    ({item.date})
                  </span>
                </div>

                {/* Second Row - Items Count and Total */}
                <div className="flex flex-row justify-between items-center gap-2">
                  <div
                    className="px-3 py-1 rounded-md text-white text-sm font-semibold w-fit"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {item.items} items
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/icons/money.svg"
                      alt="money icon"
                      width="20"
                      height="20"
                    />
                    <span className="text-base md:text-md font-semibold text-[#3F7D6C]">
                      total: EGP
                      <span className="text-xl font-nunitoBold">
                        {" "}
                        {item.total}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-2 mt-2">
                  <div
                    className="px-3 py-1 rounded-md text-white text-sm font-semibold w-fit"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {item.items} items
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/icons/money.svg"
                      alt="money icon"
                      width="20"
                      height="20"
                    />
                    <span className="text-base md:text-md font-semibold text-[#3F7D6C]">
                      total: EGP
                      <span className="text-xl font-nunitoBold">
                        {" "}
                        {item.total}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={handleContinue}
              disabled={selectedItems.length === 0}
              className={`w-full lg:w-[50%] py-2 px-4 text-md md:text-lg lg:text-xl rounded-md font-semibold transition-colors duration-300 ${
                selectedItems.length === 0
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-btnsGreen text-white hover:bg-green-900"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
}

export default CartPage;
