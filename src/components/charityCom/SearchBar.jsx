import React from "react";
import { Search, Favorite } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";

export default function SearchBar() {
  return (
    <div className="flex flex-col gap-2 w-[90%] mx-auto mt-10 p-4 font-nunitoBold">
      <div className="flex items-center gap-4">
        <div className="flex-6 flex items-center border border-lightGrey rounded-xl p-2 w-[60%] relative">
          <Search className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Find what you want..."
            className="border-none outline-none flex-1"
          />
          <select className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-2 h-full mr-2">
            <option value="All">All</option>
            <option value="Vendor">Vendor</option>
            <option value="Food">Food</option>
            <option value="Bag">Bag</option>
          </select>
          <button className="bg-btnsGreen text-white p-2 rounded-md hover:bg-green-600 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
        <button className="flex-2 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-[20%] hover:bg-gray-50">
          <TuneIcon className="mr-2" />
          Filter
        </button>
        <div className="flex-1 flex items-center justify-center border border-lightGrey rounded-xl p-2 h-10 w-[5%] bg-btnsGreen text-white cursor-pointer">
          <img src="/icons/cart.svg" alt="cart icon" width={"22"} />
        </div>
        <div className="flex-1 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-[5%] bg-btnsGreen text-white cursor-pointer">
          <Favorite />
        </div>
      </div>
      <div className="flex items-center">
        <div className="rounded-md px-2 py-2 w-[25%] bg-verylightGrey">
          <span className="w-[20%]">Sort by: </span>
          <select className="bg-verylightGrey border border-lightGrey rounded-md px-2 cursor-pointer w-[80%]">
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
            <option value="most popular">Most Popular</option>
            <option value="price">Price</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>
    </div>
  );
}
