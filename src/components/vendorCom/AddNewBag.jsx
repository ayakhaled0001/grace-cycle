import React from "react";
import { useNavigate } from "react-router-dom";
import AddNewItemForm from "./AddNewItemForm";

const AddNewBag = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-offWhite min-h-screen p-4">
      <div className="flex justify-end h-10">
        <div className="flex border-2 border-[#225A4B] rounded-2xl overflow-hidden bg-[#F5F3EB]">
          <button
            className={`px-8 py-3 text-xl font-nunitoBold transition-all bg-[#F5F3EB] text-[#225A4B] flex justify-center items-center`}
            onClick={() => navigate("/VendorPage/addNewItem")}
          >
            Products
          </button>
          <button
            className={`px-8 py-3 text-xl font-nunitoBold transition-all bg-[#225A4B] text-white flex justify-center items-center`}
            onClick={() => navigate("/VendorPage/addNewBag")}
          >
            Bags
          </button>
        </div>
      </div>
      <AddNewItemForm type="bag" />
    </div>
  );
};

export default AddNewBag;
