import React from "react";
import HomeNav from "../../components/homeCom/HomeNav";
import HomeFooter from "../../components/homeCom/HomeFooter";
// سيتم إنشاء هذين المكونين لاحقاً
import ReceivingAddress from "../../components/charityCom/ReceivingAddress";
import PaymentMethod from "../../components/charityCom/PaymentMethod";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  // بيانات وهمية للملخص (سيتم ربطها بالريدوكس أو API لاحقاً)
  const products = [
    { name: "Mushroom Soup", quantity: 3, price: 408 },
    { name: "Mushroom Soup", quantity: 1, price: 136 },
  ];
  const bags = [{ name: "Magic Bag name", quantity: 1, price: 136 }];
  const deliveryFee = 0;
  const subtotal = 690;
  const total = 690;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bgBeigeWhite flex flex-col">
      <HomeNav backgroundColor="bg-[#EEEADF]" />
      <div className="flex-1 py-10 px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* القسم الأيسر */}
        <div className="lg:col-span-2 space-y-0">
          <ReceivingAddress />
          <PaymentMethod />
        </div>
        {/* القسم الأيمن - ملخص الدفع */}
        <div className="lg:sticky lg:top-20">
          <div className="bg-[#EEEADF] rounded-lg p-6 font-nunitoBold">
            <h3 className="text-xl font-nunitoBold text-gray-800 mb-4">
              Payment Summary
            </h3>
            <div className="space-y-4">
              {/* المنتجات */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-nunitoBold">Products</span>
                <span className="font-semibold font-nunitoBold">EGP 554</span>
              </div>
              {products.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-gray-600 font-nunitoBold"
                >
                  <span>
                    {item.name} *{item.quantity}
                  </span>
                  <span>EGP {item.price}</span>
                </div>
              ))}
              {/* الأكياس */}
              {/* <div className="flex justify-between items-center">
                <span className="text-gray-700 font-nunitoBold">Bags</span>
                <span className="font-semibold font-nunitoBold">EGP 136</span>
              </div>
              {bags.map((bag, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-gray-600 font-nunitoBold"
                >
                  <span>
                    {bag.name} *{bag.quantity}
                  </span>
                  <span>EGP {bag.price}</span>
                </div>
              ))} */}
              {/* رسوم التوصيل */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-nunitoBold">
                  Delivery fee
                </span>
                <span className="font-semibold font-nunitoBold">
                  EGP {deliveryFee}
                </span>
              </div>
              <hr className="border-gray-300" />
              {/* الإجمالي */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-nunitoBold text-gray-800">
                  Subtotal
                </span>
                <span className="text-lg font-nunitoBold">EGP {subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-nunitoBold text-gray-800">
                  Total
                </span>
                <span className="text-xl font-nunitoBold text-btnsGreen">
                  EGP {total}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="w-full py-3 bg-btnsGreen text-white rounded-md font-semibold font-nunitoBold hover:bg-green-900 transition-colors"
                onClick={() => navigate("/CharityPage/order-success")}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default PaymentPage;
