import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorProfile,
  updateVendorProfile,
} from "../../redux/VendorSettingsSlice";
import Swal from "sweetalert2";

const Settings = () => {
  const dispatch = useDispatch();
  const { vendorProfile, isLoading, error, isUpdating, updateError } =
    useSelector((state) => state.vendorSettings);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    logoUrl: "",
    picUrl: "",
    opening: "",
    closing: "",
    description: "",
    vendorType: "",
    displayName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  // Fetch vendor profile on component mount
  useEffect(() => {
    dispatch(fetchVendorProfile());
  }, [dispatch]);

  // Update form data when vendor profile is loaded
  useEffect(() => {
    if (vendorProfile) {
      setFormData(vendorProfile);
    }
  }, [vendorProfile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(updateVendorProfile(formData));

      if (updateVendorProfile.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your vendor profile has been updated successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
        setIsEditing(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result.payload || "Failed to update profile. Please try again.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData(vendorProfile);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btnsGreen mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchVendorProfile())}
            className="px-4 py-2 bg-btnsGreen text-white rounded-lg hover:bg-green-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vendor Settings
          </h1>
          <p className="text-gray-600">
            Manage your vendor profile and business information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with action buttons */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-btnsGreen text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-btnsGreen text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                      {isUpdating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>

                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Vendor Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Type *
                  </label>
                  <select
                    name="vendorType"
                    value={formData.vendorType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required>
                    <option value="">Select vendor type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Supermarket">Supermarket</option>
                    <option value="Food Truck">Food Truck</option>
                    <option value="Catering">Catering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Business Details
                </h3>

                {/* Opening Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time *
                    </label>
                    <input
                      type="time"
                      name="opening"
                      value={formData.opening}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time *
                    </label>
                    <input
                      type="time"
                      name="closing"
                      value={formData.closing}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                    placeholder="Tell customers about your business..."
                  />
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture URL
                    </label>
                    <input
                      type="url"
                      name="picUrl"
                      value={formData.picUrl}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btnsGreen focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="https://example.com/profile.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Messages */}
            {updateError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Update Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {updateError}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Preview Section */}
        {vendorProfile && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Profile Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Logo Preview */}
              {vendorProfile.logoUrl && (
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </h4>
                  <img
                    src={vendorProfile.logoUrl}
                    alt="Vendor Logo"
                    className="w-24 h-24 object-contain mx-auto border border-gray-200 rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div className="hidden w-24 h-24 bg-gray-100 border border-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                </div>
              )}

              {/* Profile Picture Preview */}
              {vendorProfile.picUrl && (
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </h4>
                  <img
                    src={vendorProfile.picUrl}
                    alt="Vendor Profile"
                    className="w-24 h-24 object-cover mx-auto border border-gray-200 rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div className="hidden w-24 h-24 bg-gray-100 border border-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                </div>
              )}

              {/* Business Info Preview */}
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Business Info
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Name:</strong> {vendorProfile.displayName}
                  </p>
                  <p>
                    <strong>Type:</strong> {vendorProfile.vendorType}
                  </p>
                  <p>
                    <strong>Hours:</strong> {vendorProfile.opening} -{" "}
                    {vendorProfile.closing}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
