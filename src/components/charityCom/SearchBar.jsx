import React, { useState } from "react";
import { Search, Favorite } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSearchType,
  setSortBy,
  fetchAllFoods,
  clearFilteredFoods,
} from "../../redux/FoodFilterSlice";
import FilterModal from "./FilterModal";

export default function SearchBar() {
  const dispatch = useDispatch();
  const {
    searchTerm,
    searchType,
    sortBy,
    categoryId,
    maxPriceFilter,
    isSearchActive,
    currentPage,
  } = useSelector((state) => state.foodFilter);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSearchTypeChange = (e) => {
    const newType = e.target.value;
    dispatch(setSearchType(newType));

    if (newType === "Food") {
      dispatch(
        fetchAllFoods({
          search: searchTerm,
          sort: sortBy,
          categoryId: categoryId,
          maxPrice: maxPriceFilter,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    } else if (newType === "All") {
      dispatch(clearFilteredFoods());
    }
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    dispatch(setSortBy(newSort));

    if (isSearchActive && searchType === "Food") {
      dispatch(
        fetchAllFoods({
          search: searchTerm,
          sort: newSort,
          categoryId: categoryId,
          maxPrice: maxPriceFilter,
          pageIndex: currentPage,
          pageSize: 9,
        })
      );
    }
  };

  const handleSearch = () => {
    if (searchType === "Food") {
      dispatch(
        fetchAllFoods({
          search: searchTerm,
          sort: sortBy,
          categoryId: categoryId,
          maxPrice: maxPriceFilter,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-[90%] mx-auto mt-10 p-4 font-nunitoBold">
        <div className="flex items-center gap-4">
          <div className="flex-6 flex items-center border border-lightGrey rounded-xl pr-2 w-[60%] relative overflow-hidden">
            <button
              onClick={handleSearch}
              className="bg-btnsGreen text-white p-2 w-14 rounded-l-md hover:bg-green-900 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Find what you want..."
              className="border-none outline-none flex-1 pl-2"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <select
              className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-2 h-full mr-2"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <button
            className="flex-2 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-[20%] hover:bg-gray-50"
            onClick={() => setIsFilterModalOpen(true)}
          >
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
            <select
              className="bg-verylightGrey border border-lightGrey rounded-md px-2 cursor-pointer w-[80%]"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="rating">Rating</option>
              <option value="discountRate">Discount Rate</option>
              <option value="mostPopular">Most Popular</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </>
  );
}
