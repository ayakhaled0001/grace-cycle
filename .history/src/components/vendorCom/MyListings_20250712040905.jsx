import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getVendorListings,
  deleteVendorListing,
  clearError,
} from "../../redux/VendorListingSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [bags, setBags] = useState([]);
  const [bagsLoading, setBagsLoading] = useState(false);
  const [bagsError, setBagsError] = useState(null);

  // Redux state
  const { vendorListings, isLoading, error, totalCount } = useSelector(
    (state) => state.vendorListing
  );

  const currentData = activeTab === "products" ? vendorListings : bags;

  // Helper to get token
  const getToken = () => localStorage.getItem("token");

  // Function to fetch vendor bags
  const fetchVendorBags = async () => {
    setBagsLoading(true);
    setBagsError(null);
    try {
      // Get bags from localStorage (temporary solution until backend endpoint is ready)
      const storedBags = localStorage.getItem("vendorBags");
      if (storedBags) {
        const parsedBags = JSON.parse(storedBags);
        setBags(parsedBags);
      } else {
        setBags([]);
      }
    } catch (error) {
      console.error("Error fetching bags:", error);
      setBagsError("Failed to fetch bags");
      setBags([]);
    } finally {
      setBagsLoading(false);
    }
  };

  // Fetch vendor listings on component mount
  useEffect(() => {
    if (activeTab === "products") {
      dispatch(getVendorListings());
    } else if (activeTab === "bags") {
      fetchVendorBags();
    }
  }, [dispatch, activeTab]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log("Edit item:", id);
    // Add edit functionality - navigate to edit page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await dispatch(deleteVendorListing(id)).unwrap();
        // Optionally show success message
      } catch (error) {
        console.error("Failed to delete item:", error);
        // Optionally show error message
      }
    }
  };

  const handleView = (id) => {
    console.log("View item:", id);
    // Add view functionality - navigate to view page
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
        {status === "active" ? "Active" : "Inactive"}
      </span>
    );
  };

  if (isLoading || bagsLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <Skeleton variant="text" width="30%" height={40} />
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={80} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-offWhite min-h-screen p-2 md:p-4">
      <div className="flex justify-end h-10 mb-8">
        <div className="flex border-2 border-[#225A4B] rounded-2xl overflow-hidden bg-[#F5F3EB]">
          <button
            className={`px-8 py-3 text-xl font-nunitoBold transition-all ${
              activeTab === "products"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("products")}>
            Products
          </button>
          <button
            className={`px-8 py-3 text-xl font-nunitoBold transition-all ${
              activeTab === "bags"
                ? "bg-[#225A4B] text-white"
                : "bg-[#F5F3EB] text-[#225A4B]"
            } flex justify-center items-center`}
            onClick={() => setActiveTab("bags")}>
            Magic Bags
          </button>
        </div>
      </div>
      <h1 className="text-xl md:text-2xl font-nunitoBold text-[#225A4A] mb-4 md:mb-6">
        Your Listings
      </h1>

      {/* Error Display */}
      {(error || bagsError) && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200 rounded-lg mb-4">
          <p className="text-red-600 text-sm">{error || bagsError}</p>
        </div>
      )}

      {/* Table Header & Body Responsive Wrapper */}
      <div className="w-full">
        {/* Header for md+ screens */}
        <div className="hidden md:block px-4 py-4 bg-[#F5F3EB] border-2 border-[#A6A6A6] rounded-lg mb-2">
          <div className="grid grid-cols-11 gap-4 text-base font-nunitoBold text-[#225A4A]">
            <div className="col-span-3">Product</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-1">Quantity</div>
            <div className="col-span-2">Price Before</div>
            <div className="col-span-2">Price After</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>
        {/* Table Body */}
        <div className="divide-y divide-[#A6A6A6]">
          {currentData.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} found
              </h3>
              <p className="text-gray-500">
                Get started by adding your first {activeTab.slice(0, -1)}.
              </p>
            </div>
          ) : (
            currentData.map((item) => (
              <div
                key={item.id}
                className="my-2 md:my-4 bg-white border-2 border-[#A6A6A6] rounded-lg px-2 md:px-4 py-2 md:py-3 flex flex-col md:grid md:grid-cols-11 gap-2 md:gap-4 items-start md:items-center shadow-sm">
                {/* Product Image */}
                <div className="flex md:col-span-3 items-center gap-3 w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Product
                  </span>
                  <img
                    src={item.picUrl || item.image}
                    alt={item.name}
                    className="w-20 h-16 rounded-lg object-cover border border-[#A6A6A6]"
                    onError={(e) => {
                      e.target.src = "/homeMedia/personreview1.png";
                    }}
                  />
                </div>
                {/* Name */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Name
                  </span>
                  <span className="text-lg font-nunitoBold text-[#225A4A] truncate">
                    {item.name}
                  </span>
                </div>
                {/* Quantity */}
                <div className="flex md:col-span-1 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Quantity
                  </span>
                  <span className="text-gray-700 font-nunitoBold">
                    {item.quantity}
                  </span>
                </div>
                {/* Price Before */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Price Before
                  </span>
                  <span className="text-gray-700 line-through">
                    {formatPrice(item.unitPrice || item.originalPrice)}
                  </span>
                </div>
                {/* Price After */}
                <div className="flex md:col-span-2 items-center w-full">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Price After
                  </span>
                  <span className="text-[#225A4A] font-nunitoBold">
                    {formatPrice(item.newPrice || item.discountedPrice)}
                  </span>
                </div>
                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-2 items-center w-full md:col-span-1">
                  <span className="block md:hidden text-xs font-nunitoBold text-[#225A4A] mb-1">
                    Actions
                  </span>
                  <img
                    src="/icons/delete.svg"
                    alt="delete"
                    className="w-4 h-6 cursor-pointer md:ml-2"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="px-2 md:px-4 py-2 md:py-4 bg-[#F5F3EB] border-2 border-[#A6A6A6] rounded-lg mt-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
        <p className="text-base text-[#225A4A] font-nunitoBold">
          Showing {currentData.length} {activeTab.slice(0, -1)}
          {currentData.length !== 1 ? "s" : ""}
        </p>
        {activeTab === "products" ? (
          <button
            className="bg-[#225A4A] font-nunitoBold text-lg rounded-md text-white px-6 py-2 hover:bg-[#174032] transition-colors w-full md:w-auto"
            onClick={() => navigate("/VendorPage/addNewItem")}>
            Add New Product
          </button>
        ) : (
          <button
            className="bg-[#225A4A] font-nunitoBold text-lg rounded-md text-white px-6 py-2 hover:bg-[#174032] transition-colors w-full md:w-auto"
            onClick={() => navigate("/VendorPage/addNewBag")}>
            Add New Bag
          </button>
        )}
      </div>
    </div>
  );
};

export default MyListings;
