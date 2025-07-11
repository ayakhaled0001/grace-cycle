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

const MyListings = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("products");

  // Redux state
  const { vendorListings, isLoading, error, totalCount } = useSelector(
    (state) => state.vendorListing
  );

  // Mock data for magic bags - replace with actual API when available
  const mockBags = [
    {
      id: 1,
      name: "Surprise Magic Bag",
      quantity: 5,
      originalPrice: 80.0,
      discountedPrice: 56.0,
      image: "/services/magicbags.png",
      status: "active",
    },
  ];

  const currentData = activeTab === "products" ? vendorListings : mockBags;

  // Fetch vendor listings on component mount
  useEffect(() => {
    if (activeTab === "products") {
      dispatch(getVendorListings());
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

  if (isLoading) {
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
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Your Listings</h1>

          {/* Tab Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "products"
                  ? "bg-white text-btnsGreen shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Products ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab("bags")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "bags"
                  ? "bg-white text-btnsGreen shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Magic Bags ({mockBags.length})
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Table Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
          <div className="col-span-3">Product</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Quantity</div>
          <div className="col-span-2">Price Before</div>
          <div className="col-span-2">Price After</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
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
              className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Product Image */}
                <div className="col-span-3 flex items-center space-x-3">
                  <img
                    src={item.picUrl || item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "/homeMedia/personreview1.png";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{item.name}</p>
                </div>

                {/* Quantity */}
                <div className="col-span-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.quantity > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {item.quantity}
                  </span>
                </div>

                {/* Price Before */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(item.unitPrice || item.originalPrice)}
                  </p>
                </div>

                {/* Price After */}
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-btnsGreen">
                    {formatPrice(item.newPrice || item.discountedPrice)}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-1">{getStatusBadge(item.status)}</div>

                {/* Actions */}
                <div className="col-span-1 flex items-center space-x-2">
                  <button
                    onClick={() => handleView(item.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View">
                    <VisibilityIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                    title="Edit">
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete">
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {currentData.length} {activeTab.slice(0, -1)}
            {currentData.length !== 1 ? "s" : ""}
          </p>
          <button className="px-4 py-2 bg-btnsGreen text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
            Add New{" "}
            {activeTab.slice(0, -1).charAt(0).toUpperCase() +
              activeTab.slice(0, -1).slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListings;
