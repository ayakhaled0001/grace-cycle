import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-bgBeigeWhite font-nunitoBold">
      {/* القسم الأيسر - الرسالة والزر */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-16 -mt-40">
        <h2 className="text-3xl md:text-4xl font-nunitoBold text-btnsGreen text-center">
          Your order was placed successfully!
        </h2>
        <p className="text-gray-700 text-center mb-8 max-w-md text-lg">
          Thank you for your purchase. Your food will be delivered soon. You can
          continue shopping for more delicious meals!
        </p>
        <button
          className="bg-btnsGreen text-white px-10 py-4 rounded-md font-nunitoBold text-xl hover:bg-green-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce"
          onClick={() => navigate("/CharityPage")}
        >
          Buy More Food
        </button>
      </div>

      {/* القسم الأيمن - الصورة */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <img
          src="/homeMedia/delivery.png"
          alt="Order Success"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OrderSuccess;
