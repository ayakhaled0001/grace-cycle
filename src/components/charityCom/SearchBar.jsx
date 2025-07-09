import React, { useState, useEffect } from "react";
import { Search, Favorite } from "@mui/icons-material";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import { fetchUserCart } from "../../redux/FoodSlice";

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

  // Get cart items count from redux (if available)
  const cart = useSelector((state) => state.servicesFood.cart || []);
  // If cart is an array of carts, sum all itemsCount
  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, c) => acc + (c.itemsCount || 0), 0)
    : 0;

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentSearchType, setCurrentSearchType] = useState("All");

  // Notify parent component when search type changes
  useEffect(() => {
    if (onSearchTypeChange) {
      onSearchTypeChange(currentSearchType);
    }
  }, [currentSearchType, onSearchTypeChange]);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

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
      <div className="flex flex-col gap-2 w-[95%] md:w-[90%] mx-auto mt-10 p-2 md:p-4 font-nunitoBold">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center border border-lightGrey rounded-xl pr-2 w-full sm:w-[60%] relative overflow-hidden">
            <button
              onClick={handleSearch}
              className="bg-btnsGreen text-white p-2 w-12 sm:w-14 rounded-l-md hover:bg-green-900 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Find what you want..."
              className="border-none outline-none flex-1 pl-2 text-sm sm:text-base"
              value={currentSearchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <select
              className="bg-verylightGrey border border-lightGrey rounded-md cursor-pointer px-1 sm:px-2 h-full mr-2 text-sm sm:text-base"
              value={currentSearchType}
              onChange={handleSearchTypeChange}
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Vendor">Vendor</option>
              <option value="Bag">Bag</option>
            </select>
          </div>
          <button
            className="flex items-center justify-center border border-lightGrey rounded-xl p-2 w-full sm:w-[20%] hover:bg-gray-50 text-sm sm:text-base"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <TuneIcon className="mr-2" />
            Filter
          </button>
          <Link
            to="/CharityPage/cart"
            className="flex items-center justify-center border border-lightGrey rounded-xl p-2 h-10 w-full sm:w-[5%] bg-btnsGreen text-white cursor-pointer hover:bg-green-900 transition-colors"
          >
            <div
              style={{ position: "relative", width: "22px", height: "22px" }}
            >
              <img src="/icons/cart.svg" alt="cart icon" width={"22"} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-18px",
                    background: "#BC0101",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    zIndex: 2,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <div className="flex items-center justify-center border border-lightGrey rounded-xl p-2 w-full sm:w-[5%] bg-btnsGreen text-white cursor-pointer">
            <Link to="/favorites">
              <Favorite />
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="rounded-md px-2 py-2 w-full sm:w-[25%] bg-verylightGrey">
            <span className="text-sm sm:text-base">Sort by: </span>
            <select
              className="bg-verylightGrey border border-lightGrey rounded-md px-2 cursor-pointer w-full sm:w-[80%] text-sm sm:text-base"
              value={currentSortBy}
              onChange={handleSortChange}
            >
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
