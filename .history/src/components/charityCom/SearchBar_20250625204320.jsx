import { Search, Favorite } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";

export default function SearchBar() {
  return (
    <div className="flex flex-col gap-2 w-[95%] mob470:w-[92%] mob560:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto mt-6 mob470:mt-8 mob560:mt-10 p-3 mob470:p-4 font-nunitoBold overflow-hidden">
      <div className="flex flex-col mob470:flex-row items-center gap-3 mob470:gap-4 w-full">
        <div className="flex items-center border border-lightGrey rounded-xl p-2 w-full mob470:w-[60%] lg:w-[50%] xl:w-[45%] relative">
          <Search className="mr-2 text-lg mob470:text-xl flex-shrink-0" />
          <input
            type="text"
            placeholder="Find what you want..."
            className="border-none outline-none flex-1 text-sm mob470:text-base min-w-0"
          />
          <select className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-1 mob470:px-2 py-1 text-xs mob470:text-sm flex-shrink-0 min-w-[50px] mob470:min-w-[60px]">
            <option value="All">All</option>
            <option value="Vendor">Vendor</option>
            <option value="Food">Food</option>
            <option value="Bag">Bag</option>
          </select>
        </div>
        <button className="flex items-center justify-center border border-lightGrey rounded-xl p-2 w-full mob470:w-[20%] lg:w-[15%] xl:w-[12%] text-sm mob470:text-base min-w-[70px] mob470:min-w-[80px]">
          <TuneIcon className="mr-1 mob470:mr-2 text-lg mob470:text-xl flex-shrink-0" />
          <span className="hidden mob470:inline">Filter</span>
        </button>
        <div className="flex items-center justify-center border border-lightGrey rounded-xl p-2 h-10 w-full mob470:w-[5%] lg:w-[4%] xl:w-[3%] bg-btnsGreen text-white cursor-pointer min-w-[35px] mob470:min-w-[40px]">
          <img
            src="../../../public/icons/cart.svg"
            alt="cart icon"
            width={"20"}
            className="flex-shrink-0"
          />
        </div>
        <div className="flex items-center justify-center border border-lightGrey rounded-xl p-2 w-full mob470:w-[5%] lg:w-[4%] xl:w-[3%] bg-btnsGreen text-white cursor-pointer min-w-[35px] mob470:min-w-[40px]">
          <Favorite className="text-lg mob470:text-xl flex-shrink-0" />
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="rounded-md px-2 py-2 w-full mob470:w-[25%] lg:w-[20%] xl:w-[18%] bg-verylightGrey min-w-[180px] mob470:min-w-[200px]">
          <span className="w-[20%] text-xs mob470:text-sm flex-shrink-0">
            Sort by:{" "}
          </span>
          <select className="bg-verylightGrey border border-lightGrey rounded-md px-1 mob470:px-2 cursor-pointer w-[80%] text-xs mob470:text-sm min-w-[100px] mob470:min-w-[120px]">
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
