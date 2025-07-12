import React, { useState } from "react";

const ReceivingAddress = () => {
  const [selected, setSelected] = useState("branch");

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
      </div>
    </div>
  );
};

export default ReceivingAddress;
