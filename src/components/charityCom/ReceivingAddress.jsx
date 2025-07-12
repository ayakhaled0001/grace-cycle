import React, { useState } from "react";

const ReceivingAddress = () => {
  const [selected, setSelected] = useState("branch");
  const [customAddress, setCustomAddress] = useState("");

  const optionStyle = (isActive) =>
    `flex items-center gap-3 cursor-pointer p-2 rounded-md transition-all font-nunitoBold 
    ${
      isActive
        ? "bg-[#EFF0E9] border-2 border-[#225A4B] text-[#225A4B]"
        : "bg-[#EFF0E9] border-2 border-transparent text-gray-600 hover:bg-[#e0e0d6] hover:text-[#225A4B] opacity-80 hover:opacity-100"
    }`;

  return (
    <div className="rounded-lg p-6 bg-transparent font-nunitoBold">
      <h2 className="text-lg font-nunitoBold mb-4 text-gray-800">
        Receiving address
      </h2>
      <div className="space-y-4">
        <label className={optionStyle(selected === "branch")}>
          <input
            type="radio"
            name="address"
            checked={selected === "branch"}
            onChange={() => setSelected("branch")}
            className="accent-btnsGreen"
          />
          <span className="flex items-center gap-2">
            <img
              src="/public/icons/branch.svg"
              alt="branch"
              className="w-6 h-6"
            />
            <span>Receiving from branch</span>
          </span>
        </label>
        <label className={optionStyle(selected === "address")}>
          <input
            type="radio"
            name="address"
            checked={selected === "address"}
            onChange={() => setSelected("address")}
            className="accent-btnsGreen"
          />
          <span className="flex items-center gap-2">
            <img
              src="/public/icons/paymentLoc.svg"
              alt="location"
              className="w-6 h-6"
            />
            <span>Egypt, Cairo, Alf maskan</span>
          </span>
        </label>
        {/* Custom Address Input */}
        {selected === "address" && (
          <div className="mt-2 p-4 rounded-md transition-all duration-300 ease-in-out transform origin-top">
            <label className="block text-sm font-nunitoBold text-[#225A4B] mb-2">
              Enter your detailed address:
            </label>
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Enter your full address here..."
              className="bg-[#EFF0E9] w-full p-3 border border-gray-300 rounded-md font-nunitoBold focus:outline-none focus:border-[#225A4B] focus:ring-1 focus:ring-[#225A4B]"
            />
          </div>
        )}
        <label className={optionStyle(selected === "new")}>
          <input
            type="radio"
            name="address"
            checked={selected === "new"}
            onChange={() => setSelected("new")}
            className="accent-btnsGreen"
          />
          <span className="flex items-center gap-2">
            <img
              src="/public/icons/addLoc.svg"
              alt="add location"
              className="w-6 h-6"
            />
            <span>Add new address</span>
          </span>
        </label>

        {/* Custom Address Input for New Address */}
        {selected === "new" && (
          <div className="mt-2 p-4 rounded-md transition-all duration-300 ease-in-out transform origin-top">
            <label className="block text-sm font-nunitoBold text-[#225A4B] mb-2">
              Enter your new address:
            </label>
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Enter your new address here..."
              className="bg-[#EFF0E9] w-full p-3 border border-gray-300 rounded-md font-nunitoBold focus:outline-none focus:border-[#225A4B] focus:ring-1 focus:ring-[#225A4B]"
            />
          </div>
        )}
        {/* Custom Address Input */}
        {selected === "address" && (
          <div className="mt-2 p-4 rounded-md transition-all duration-300 ease-in-out transform origin-top">
            <label className="block text-sm font-nunitoBold text-[#225A4B] mb-2">
              Enter your detailed address:
            </label>
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Enter your full address here..."
              className="bg-[#EFF0E9] w-full p-3 border border-gray-300 rounded-md font-nunitoBold focus:outline-none focus:border-[#225A4B] focus:ring-1 focus:ring-[#225A4B]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivingAddress;
