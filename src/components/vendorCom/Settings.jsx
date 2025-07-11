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
            className="px-4 py-2 bg-btnsGreen text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-nunitoBold text-[#225A4A] mb-2">
            Vendor Settings
          </h1>
          <p className="text-[#225A4A] font-nunitoBold">
            Manage your vendor profile and business information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border-2 border-[#A6A6A6] p-6">
          {/* Profile Preview Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 justify-center">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#225A4A] shadow-lg mb-2 bg-gray-100 flex items-center justify-center">
                <img
                  src={formData.picUrl || "/homeMedia/personreview1.png"}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = "/homeMedia/personreview1.png";
                  }}
                />
              </div>
              <span className="text-[#225A4A] font-nunitoBold text-sm mt-1">
                Profile Picture
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#A6A6A6] shadow-lg mb-2 bg-gray-100 flex items-center justify-center">
                <img
                  src={formData.logoUrl || "/solidGraceCycleLogo.svg"}
                  alt="Logo Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = "/solidGraceCycleLogo.svg";
                  }}
                />
              </div>
              <span className="text-[#225A4A] font-nunitoBold text-sm mt-1">
                Business Logo
              </span>
            </div>
          </div>
          {/* Header with action buttons */}
          <div className="mb-6 flex items-center justify-between border-b-2 border-[#A6A6A6] pb-4">
            <h2 className="text-xl font-nunitoBold text-[#225A4A]">
              Profile Information
            </h2>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-[#225A4A] text-white font-nunitoBold rounded-md hover:bg-[#174032] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                    className="px-6 py-2 border-2 border-[#BC0101] text-[#BC0101] font-nunitoBold rounded-md hover:bg-[#BC0101] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="px-6 py-2 bg-[#225A4A] text-white font-nunitoBold rounded-md hover:bg-[#174032] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
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
                          viewBox="0 0 24 24"
                        >
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

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
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
                  required
                >
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
          </form>

          {/* Error Messages */}
          {updateError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
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
                  <div className="mt-2 text-sm text-red-700">{updateError}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
