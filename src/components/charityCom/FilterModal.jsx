import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setMaxPriceFilter,
  fetchAllFoods,
} from "../../redux/FoodFilterSlice";
import { fetchCategories } from "../../redux/CategoriesSlice";

const FilterModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { categoryId, maxPriceFilter, searchTerm, sortBy } = useSelector(
    (state) => state.foodFilter
  );

  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [isOpen, dispatch, categories.length]);

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
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
  };

  const handlePriceChange = (e) => {
    const newMaxPrice = e.target.value;
    dispatch(setMaxPriceFilter(newMaxPrice));

    // Apply filter immediately
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
            value={categoryId}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-lightGrey rounded-md bg-verylightGrey focus:outline-none focus:ring-2 focus:ring-btnsGreen"
            disabled={categoriesLoading}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {categoriesLoading && (
            <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-nunitoBold text-gray-700 mb-2">
            Filter by Max Price:
          </label>
          <select
            value={maxPriceFilter}
            onChange={handlePriceChange}
            className="w-full p-2 border border-lightGrey rounded-md bg-verylightGrey focus:outline-none focus:ring-2 focus:ring-btnsGreen"
          >
            <option value="">Any</option>
            <option value="20">Less than 20</option>
            <option value="50">Less than 50</option>
            <option value="100">Less than 100</option>
            <option value="150">Less than 150</option>
            <option value="200">Less than 200</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
