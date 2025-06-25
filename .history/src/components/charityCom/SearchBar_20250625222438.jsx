import React, { useState, useEffect } from "react";
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
import {
  setSearchTerm as setVendorSearchTerm,
  setSearchType as setVendorSearchType,
  setSortBy as setVendorSortBy,
  setVendorTypeId,
  fetchAllVendors,
  clearFilteredVendors,
} from "../../redux/VendorFilterSlice";
import FilterModal from "./FilterModal";
import {
  fetchAllBags,
  setBagsPage,
  setSearchTerm as setBagsSearchTerm,
  setSortBy as setBagsSortBy,
} from "../../redux/BagsSlice";

export default function SearchBar({
  onSearchTypeChange,
  setBagIsSearchActive,
}) {
  const dispatch = useDispatch();
  const {
    searchTerm,
    sortBy,
    categoryId,
    maxPriceFilter,
    isSearchActive,
    currentPage,
  } = useSelector((state) => state.foodFilter);

  const {
    searchTerm: vendorSearchTerm,
    sortBy: vendorSortBy,
    vendorTypeId,
    isSearchActive: vendorIsSearchActive,
    currentPage: vendorCurrentPage,
  } = useSelector((state) => state.vendorFilter);

  const {
    bags,
    totalCount: bagsTotalCount,
    currentPage: bagsCurrentPage,
    pageSize: bagsPageSize,
    loading: bagsLoading,
    error: bagsError,
    searchTerm: bagSearchTerm,
    sortBy: bagSortBy,
    maxPriceFilter: bagMaxPriceFilter,
  } = useSelector((state) => state.bags);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentSearchType, setCurrentSearchType] = useState("All");

  // Notify parent component when search type changes
  useEffect(() => {
    if (onSearchTypeChange) {
      onSearchTypeChange(currentSearchType);
    }
  }, [currentSearchType, onSearchTypeChange]);

  const handleSearchChange = (e) => {
    if (currentSearchType === "Vendor") {
      dispatch(setVendorSearchTerm(e.target.value));
    } else if (currentSearchType === "Bag") {
      dispatch(setBagsSearchTerm(e.target.value));
    } else {
      dispatch(setSearchTerm(e.target.value));
    }
  };

  const handleSearchTypeChange = (e) => {
    const newType = e.target.value;
    setCurrentSearchType(newType);

    if (onSearchTypeChange) {
      onSearchTypeChange(newType);
    }

    if (newType === "Food") {
      dispatch(setSearchType(newType));
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
    } else if (newType === "Vendor") {
      dispatch(setVendorSearchType(newType));
      dispatch(
        fetchAllVendors({
          search: vendorSearchTerm,
          sort: vendorSortBy,
          vendorTypeId: vendorTypeId,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    } else if (newType === "Bag") {
      dispatch(
        fetchAllBags({
          search: bagSearchTerm,
          sort: bagSortBy,
          maxPrice: bagMaxPriceFilter,
          pageIndex: 1,
          pageSize: 10,
        })
      );
      if (setBagIsSearchActive) setBagIsSearchActive(true);
    } else if (newType === "All") {
      dispatch(clearFilteredFoods());
      dispatch(clearFilteredVendors());
      if (setBagIsSearchActive) setBagIsSearchActive(false);
    }
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;

    if (currentSearchType === "Vendor") {
      dispatch(setVendorSortBy(newSort));
      if (vendorIsSearchActive) {
        dispatch(
          fetchAllVendors({
            search: vendorSearchTerm,
            sort: newSort,
            vendorTypeId: vendorTypeId,
            pageIndex: vendorCurrentPage,
            pageSize: 9,
          })
        );
      }
    } else if (currentSearchType === "Bag") {
      dispatch(setBagsSortBy(newSort));
      dispatch(
        fetchAllBags({
          search: bagSearchTerm,
          sort: newSort,
          maxPrice: bagMaxPriceFilter,
          pageIndex: bagsCurrentPage,
          pageSize: 10,
        })
      );
      if (setBagIsSearchActive) setBagIsSearchActive(true);
    } else {
      dispatch(setSortBy(newSort));
      if (isSearchActive && currentSearchType === "Food") {
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
    }
  };

  const handleSearch = () => {
    if (currentSearchType === "Food") {
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
    } else if (currentSearchType === "Vendor") {
      dispatch(
        fetchAllVendors({
          search: vendorSearchTerm,
          sort: vendorSortBy,
          vendorTypeId: vendorTypeId,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    } else if (currentSearchType === "Bag") {
      dispatch(
        fetchAllBags({
          search: bagSearchTerm,
          sort: bagSortBy,
          maxPrice: bagMaxPriceFilter,
          pageIndex: 1,
          pageSize: 10,
        })
      );
      if (setBagIsSearchActive) setBagIsSearchActive(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Get current values based on search type
  const currentSearchTerm =
    currentSearchType === "Vendor"
      ? vendorSearchTerm
      : currentSearchType === "Bag"
      ? bagSearchTerm
      : searchTerm;
  const currentSortBy =
    currentSearchType === "Vendor"
      ? vendorSortBy
      : currentSearchType === "Bag"
      ? bagSortBy
      : sortBy;

  const handleBagMaxPriceChange = (e) => {
    dispatch(
      fetchAllBags({
        search: bagSearchTerm,
        sort: bagSortBy,
        maxPrice: e.target.value,
        pageIndex: 1,
        pageSize: 10,
      })
    );
    if (setBagIsSearchActive) setBagIsSearchActive(true);
  };

  const handleBagPageChange = (page) => {
    dispatch(setBagsPage(page));
    dispatch(
      fetchAllBags({
        search: bagSearchTerm,
        sort: bagSortBy,
        maxPrice: bagMaxPriceFilter,
        pageIndex: page,
        pageSize: 10,
      })
    );
    if (setBagIsSearchActive) setBagIsSearchActive(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-[90%] mx-auto mt-10 p-4 font-nunitoBold">
        <div className="flex items-center gap-4">
          <div className="flex-6 flex items-center border border-lightGrey rounded-xl pr-2 w-[60%] relative overflow-hidden">
            <button
              onClick={handleSearch}
              className="bg-btnsGreen text-white p-2 w-14 rounded-l-md hover:bg-green-900 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Find what you want..."
              className="border-none outline-none flex-1 pl-2"
              value={currentSearchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <select
              className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-2 h-full mr-2"
              value={currentSearchType}
              onChange={handleSearchTypeChange}>
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Vendor">Vendor</option>
              <option value="Bag">Bag</option>
            </select>
          </div>
          <button
            className="flex-2 flex items-center justify-center border border-lightGrey rounded-xl p-2 w-[20%] hover:bg-gray-50"
            onClick={() => setIsFilterModalOpen(true)}>
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
              value={currentSortBy}
              onChange={handleSortChange}>
              {currentSearchType === "Vendor" ? (
                <>
                  <option value="rating">Rating</option>
                  <option value="mostPopular">Most Popular</option>
                  <option value="distance">Distance</option>
                </>
              ) : currentSearchType === "Bag" ? (
                <>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                  <option value="discount">Discount</option>
                </>
              ) : (
                <>
                  <option value="rating">Rating</option>
                  <option value="discountRate">Discount Rate</option>
                  <option value="mostPopular">Most Popular</option>
                  <option value="price">Price</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentSearchType={currentSearchType}
      />
    </>
  );
}
