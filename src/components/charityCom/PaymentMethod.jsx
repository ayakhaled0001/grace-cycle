import React, { useState } from "react";

const PaymentMethod = () => {
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const sectionStyle = (active) =>
    `rounded-md p-4 mb-4 transition-all font-nunitoBold border-2 ${
      active
        ? "border-[#225A4B] bg-[#EFF0E9] opacity-100"
        : "border-transparent bg-[#EFF0E9] opacity-60 hover:opacity-90 hover:bg-[#e0e0d6]"
    }`;

  const inputStyle =
    "w-full border rounded-md px-3 py-2 focus:outline-none bg-[#EFF0E9] text-gray-600 font-nunitoBold focus:border-[#225A4B] border-gray-300 placeholder:text-gray-400 transition-all";

  return (
    <div className="rounded-lg p-6 bg-transparent font-nunitoBold">
      <h2 className="text-lg font-nunitoBold mb-4 text-gray-800">
        Payment Method
      </h2>
      {/* Cash on Delivery */}
      <div
        className={sectionStyle(method === "cod")}
        onClick={() => setMethod("cod")}
        style={{ cursor: "pointer" }}
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
            className="accent-btnsGreen"
          />
          <span className="flex items-center gap-2">
            <img src="/public/icons/cash.svg" alt="cash" className="w-6 h-6" />
            <span>Cash on Delivery</span>
          </span>
        </label>
      </div>
      {/* Card Payment */}
      <div
        className={sectionStyle(method === "card")}
        onClick={() => setMethod("card")}
        style={{ cursor: "pointer" }}
      >
        <div className="flex gap-6 mb-4 justify-center">
          <div className="w-20 h-10 border border-[#225A4B] rounded-lg p-1 bg-transparent flex items-center justify-center">
            <img src="/icons/instapay.svg" alt="instapay" />
          </div>
          <div className="w-20 h-10 border border-[#225A4B] rounded-lg p-1 bg-transparent flex items-center justify-center">
            <img src="/icons/paypal.svg" alt="paypal" />
          </div>
          <div className="w-20 h-10 border border-[#225A4B] rounded-lg p-1 bg-transparent flex items-center justify-center">
            <img
              src="/icons/visa.svg"
              alt="visa"
              className="w-10 h-6 object-contain"
            />
          </div>
          <div className="w-20 h-10 border border-[#225A4B] rounded-lg p-1 bg-transparent flex items-center justify-center">
            <img src="/icons/mastercard.svg" alt="mastercard" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              className={inputStyle}
              placeholder="5432 9876 2134 0986"
              disabled={method !== "card"}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Holder Name
            </label>
            <input
              type="text"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              className={inputStyle}
              placeholder="Zahraa Soliman"
              disabled={method !== "card"}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Expiry date
            </label>
            <input
              type="text"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              className={inputStyle}
              placeholder="12/28"
              disabled={method !== "card"}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">CVV</label>
            <input
              type="text"
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              className={inputStyle}
              placeholder="320"
              disabled={method !== "card"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
