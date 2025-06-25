import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setMaxPriceFilter,
  fetchAllFoods,
} from "../../redux/FoodFilterSlice";
import {
  setVendorTypeId,
  fetchAllVendors,
} from "../../redux/VendorFilterSlice";
import { fetchCategories } from "../../redux/CategoriesSlice";
import { fetchVendorCategories } from "../../redux/VendorCategoriesSlice";
import {
  fetchAllBags,
  setMaxPriceFilter as setBagsMaxPriceFilter,
} from "../../redux/BagsSlice";

const FilterModal = ({ isOpen, onClose, currentSearchType }) => {
  const dispatch = useDispatch();
  const { categoryId, maxPriceFilter, searchTerm, sortBy } = useSelector(
    (state) => state.foodFilter
  );

  const {
    vendorTypeId,
    searchTerm: vendorSearchTerm,
    sortBy: vendorSortBy,
  } = useSelector((state) => state.vendorFilter);

  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { vendorCategories, loading: vendorCategoriesLoading } = useSelector(
    (state) => state.vendorCategories
  );

  const {
    maxPriceFilter: bagMaxPriceFilter,
    searchTerm: bagSearchTerm,
    sortBy: bagSortBy,
  } = useSelector((state) => state.bags);

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      if (currentSearchType === "Food" && categories.length === 0) {
        dispatch(fetchCategories());
      } else if (
        currentSearchType === "Vendor" &&
        vendorCategories.length === 0
      ) {
        dispatch(fetchVendorCategories());
      }
    }
  }, [
    isOpen,
    dispatch,
    categories.length,
    vendorCategories.length,
    currentSearchType,
  ]);

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;

    if (currentSearchType === "Food") {
      dispatch(setCategoryId(newCategoryId));

      // Apply filter immediately
      dispatch(
        fetchAllFoods({
          search: searchTerm,
          sort: sortBy,
          categoryId: newCategoryId,
          maxPrice: maxPriceFilter,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    } else if (currentSearchType === "Vendor") {
      dispatch(setVendorTypeId(newCategoryId));

      // Apply filter immediately
      dispatch(
        fetchAllVendors({
          search: vendorSearchTerm,
          sort: vendorSortBy,
          vendorTypeId: newCategoryId,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    }
  };

  const handlePriceChange = (e) => {
    const newMaxPrice = e.target.value;
    dispatch(setMaxPriceFilter(newMaxPrice));

    // Apply filter immediately (only for food)
    if (currentSearchType === "Food") {
      dispatch(
        fetchAllFoods({
          search: searchTerm,
          sort: sortBy,
          categoryId: categoryId,
          maxPrice: newMaxPrice,
          pageIndex: 1,
          pageSize: 9,
        })
      );
    }
  };

  const handleBagPriceChange = (e) => {
    const newMaxPrice = e.target.value;
    dispatch(setBagsMaxPriceFilter(newMaxPrice));
    // Apply filter immediately for bags
    if (currentSearchType === "Bag") {
      dispatch(
        fetchAllBags({
          search: bagSearchTerm,
          sort: bagSortBy,
          maxPrice: newMaxPrice,
          pageIndex: 1,
          pageSize: 10,
        })
      );
    }
  };

  const handleBackdropClick = (e) => {
    // Close modal when clicking on the backdrop (outside the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90%] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-nunitoBold text-gray-800">
            Filter Options
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-nunitoBold text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            value={currentSearchType === "Vendor" ? vendorTypeId : categoryId}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-lightGrey rounded-md bg-verylightGrey focus:outline-none focus:ring-2 focus:ring-btnsGreen"
            disabled={
              currentSearchType === "Food"
                ? categoriesLoading
                : vendorCategoriesLoading
            }
          >
            <option value="">All Categories</option>
            {currentSearchType === "Food"
              ? categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              : vendorCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
          </select>
          {(currentSearchType === "Food"
            ? categoriesLoading
            : vendorCategoriesLoading) && (
            <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
          )}
        </div>

        {(currentSearchType === "Food" || currentSearchType === "Bag") && (
          <div className="mb-6">
            <label className="block text-sm font-nunitoBold text-gray-700 mb-2">
              Filter by Max Price:
            </label>
            <select
              value={
                currentSearchType === "Food"
                  ? maxPriceFilter
                  : bagMaxPriceFilter
              }
              onChange={
                currentSearchType === "Food"
                  ? handlePriceChange
                  : handleBagPriceChange
              }
              className="w-full p-2 border border-lightGrey rounded-md bg-verylightGrey focus:outline-none focus:ring-2 focus:ring-btnsGreen"
            >
              <option value="">Any</option>
              {currentSearchType === "Food" ? (
                <>
                  <option value="20">Less than 20</option>
                  <option value="50">Less than 50</option>
                  <option value="100">Less than 100</option>
                  <option value="150">Less than 150</option>
                  <option value="200">Less than 200</option>
                  <option value="300">Less than 300</option>
                </>
              ) : (
                <>
                  <option value="100">Less than 100</option>
                  <option value="150">Less than 150</option>
                  <option value="300">Less than 300</option>
                </>
              )}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterModal;
