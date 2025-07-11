import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/Vendors/VendorProfile";

// Async thunk to fetch vendor profile
export const fetchVendorProfile = createAsyncThunk(
  "vendorSettings/fetchVendorProfile",
  async (_, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("Fetching vendor profile...");
      const response = await axios.get(BaseUrl, config);
      console.log("Vendor profile response:", response.data);

      return response.data;
    } catch (error) {
      console.log("Error fetching vendor profile");
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Show error message
      let errorMessage = "Failed to load vendor profile";

      if (error.response?.status === 401) {
        errorMessage = "Please login again to view your profile";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to update vendor profile
export const updateVendorProfile = createAsyncThunk(
  "vendorSettings/updateVendorProfile",
  async (profileData, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("Updating vendor profile with data:", profileData);
      const response = await axios.put(BaseUrl, profileData, config);
      console.log("Update vendor profile response:", response.data);

      return response.data;
    } catch (error) {
      console.log("Error updating vendor profile");
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Show error message
      let errorMessage = "Failed to update vendor profile";

      if (error.response?.status === 400) {
        errorMessage = "Invalid profile data provided";
      } else if (error.response?.status === 401) {
        errorMessage = "Please login again to update your profile";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  vendorProfile: {
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
  },
  isLoading: false,
  error: null,
  isUpdating: false,
  updateError: null,
};

// Vendor settings slice
const vendorSettingsSlice = createSlice({
  name: "vendorSettings",
  initialState,
  reducers: {
    // Clear vendor profile data
    clearVendorProfile: (state) => {
      state.vendorProfile = initialState.vendorProfile;
      state.error = null;
      state.updateError = null;
    },
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.updateError = null;
    },
    // Update specific field in vendor profile (for local state updates)
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.vendorProfile, field)) {
        state.vendorProfile[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vendor profile cases
      .addCase(fetchVendorProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Vendor profile fetched successfully:", action.payload);
        state.vendorProfile = action.payload;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Vendor profile fetch failed:", action.payload);
      })
      // Update vendor profile cases
      .addCase(updateVendorProfile.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        console.log("Vendor profile updated successfully:", action.payload);
        state.vendorProfile = action.payload;
      })
      .addCase(updateVendorProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload;
        console.log("Vendor profile update failed:", action.payload);
      });
  },
});

export const { clearVendorProfile, clearErrors, updateProfileField } =
  vendorSettingsSlice.actions;

export default vendorSettingsSlice.reducer;
