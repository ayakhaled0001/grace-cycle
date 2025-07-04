import React from "react";
import {
  Search,
  FilterList,
  ShoppingCart,
  Favorite,
} from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";

export default function SearchBar() {
  return (
    <div className="flex flex-col gap-2 w-[90%] mx-auto mt-10 p-4 font-nunitoBold">
      <div className="flex items-center gap-4">
        <div className="flex-6 flex items-center border border-lightGrey rounded-xl p-2 w-[60%]">
          <Search className="mr-2" />
          <input
            type="text"
            placeholder="Find what you want..."
            className="border-none outline-none flex-1 text-sm mob470:text-base min-w-0"
          />
          <select className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-2 h-full">
            <option value="All">All</option>
            <option value="Vendor">Vendor</option>
            <option value="Food">Food</option>
            <option value="Bag">Bag</option>
          </select>
          <button className="bg-btnsGreen text-white p-2 rounded-md hover:bg-green-600 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
        <button className="flex-2 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-[20%]">
          <TuneIcon className="mr-2" /> Filter
        </button>
        <div className="flex-1 flex items-center justify-center border border-lightGrey rounded-xl p-2 h-10 w-[5%] bg-btnsGreen text-white cursor-pointer">
          <img
            src="../../../public/icons/cart.svg"
            alt="cart icon"
            width={"22"}
          />
        </div>
        <div className="flex items-center justify-center border border-lightGrey rounded-xl p-2 flex-shrink-0 w-full mob470:w-auto mob470:min-w-[45px] bg-btnsGreen text-white cursor-pointer">
          <Favorite className="text-lg mob470:text-xl flex-shrink-0" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="rounded-md px-2 py-2 w-[25%] bg-verylightGrey">
          <span className="w-[20%]">Sort by: </span>
          <select className="bg-verylightGrey border border-lightGrey rounded-md px-2 cursor-pointer w-[80%]">
            <option value="Category">Food Category</option>
            <option value="Rating">Food Rating</option>
            <option value="Discount">Discount rate</option>
            <option value="popular">Most popular</option>
            <option value="Distance">Distance</option>
            <option value="Price">Price</option>
          </select>
        </div>
      </div>
    </div>
  );
}
