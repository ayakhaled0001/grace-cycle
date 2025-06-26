import { Search, Favorite } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";

export default function SearchBar() {
  return (
    <div className="flex flex-col gap-2 w-[95%] mob470:w-[92%] mob560:w-[90%] mx-auto mt-6 mob470:mt-8 mob560:mt-10 p-3 mob470:p-4 font-nunitoBold">
      <div className="flex flex-col mob470:flex-row items-center gap-3 mob470:gap-4">
        <div className="flex-6 flex items-center border border-lightGrey rounded-xl p-2 w-full mob470:w-[60%]">
          <Search className="mr-2 text-lg mob470:text-xl" />
          <input
            type="text"
            placeholder="Find what you want..."
            className="border-none outline-none flex-1 text-sm mob470:text-base"
          />
          <select className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-2 h-full text-xs mob470:text-sm">
            <option value="All">All</option>
            <option value="Vendor">Vendor</option>
            <option value="Food">Food</option>
            <option value="Bag">Bag</option>
          </select>
        </div>
        <button className="flex-2 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-full mob470:w-[20%] text-sm mob470:text-base">
          <TuneIcon className="mr-2" /> Filter
        </button>
        <div className="flex-1 flex items-center justify-center border border-lightGrey rounded-xl p-2 h-10 w-full mob470:w-[5%] bg-btnsGreen text-white cursor-pointer">
          <img
            src="../../../public/icons/cart.svg"
            alt="cart icon"
            width={"22"}
          />
        </div>
        <div className="flex-1 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-full mob470:w-[5%] bg-btnsGreen text-white cursor-pointer">
          <Favorite />
        </div>
      </div>
      <div className="flex items-center">
        <div className="rounded-md px-2 py-2 w-full mob470:w-[25%] bg-verylightGrey">
          <span className="w-[20%] text-xs mob470:text-sm">Sort by: </span>
          <select className="bg-verylightGrey border border-lightGrey rounded-md px-2 cursor-pointer w-[80%] text-xs mob470:text-sm">
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
