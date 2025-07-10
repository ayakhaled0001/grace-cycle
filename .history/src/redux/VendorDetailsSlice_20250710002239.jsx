import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  vendorDetails: null,
  itemsOffered: [],
  similarItems: [],
  reviews: [],
  reviewsSummary: null,
  isLoading: false,
  error: "",
};

// =================== Request: Get Vendor Details =======================
export const getVendorDetails = createAsyncThunk(
  "vendorDetails/getVendorDetails",
  async (vendorId, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      // Try using the discover vendors endpoint to get all vendors and find the specific one
      const response = await axios.get(
        `${BaseUrl}api/web/discover/vendors?pageIndex=1&pageSize=1000`,
        config
      );

      const vendors = response.data.data || response.data || [];

      // Find the specific vendor by ID
      const vendor = vendors.find(
        (vendor) =>
          vendor.userId?.toString() === vendorId?.toString() ||
          vendor.id?.toString() === vendorId?.toString() ||
          vendor._id?.toString() === vendorId?.toString()
      );

      if (!vendor) {
        return thunkAPI.rejectWithValue("Vendor not found");
      }

      // For now, return the vendor with empty similarItems since we don't have a specific endpoint
      return {
        ...vendor,
        similarItems: [], // Will be populated later if needed
        reviewsSummary: null,
        reviews: [],
        itemsOffered: [], // Will be populated later if needed
      };
    } catch (err) {
      console.error("Error fetching vendor details:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching vendor details"
      );
    }
  }
);

// =================== Vendor Details Slice =======================
export const VendorDetailsSlice = createSlice({
  name: "vendorDetails",
  initialState,
  reducers: {
    clearVendorDetails: (state) => {
      state.vendorDetails = null;
      state.itemsOffered = [];
      state.similarItems = [];
      state.reviews = [];
      state.reviewsSummary = null;
      state.isLoading = false;
      state.error = "";
    },
    toggleVendorFavourite: (state) => {
      if (state.vendorDetails) {
        state.vendorDetails.isFavourite = !state.vendorDetails.isFavourite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Get Vendor Details *******************
      .addCase(getVendorDetails.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getVendorDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendorDetails = {
          userId: action.payload.userId,
          displayName: action.payload.displayName,
          address: action.payload.address,
          logoUrl: action.payload.logoUrl,
          picUrl: action.payload.picUrl,
          opening: action.payload.opening,
          closing: action.payload.closing,
          rating: action.payload.rating,
          isFavourite: action.payload.isFavourite,
          vendorType: action.payload.vendorType,
          description: action.payload.description,
        };
        state.itemsOffered = action.payload.itemsOffered || [];
        state.similarItems = action.payload.similarItems || [];
        state.reviews = action.payload.reviews || [];
        state.reviewsSummary = action.payload.reviewsSummary || null;
      })
      .addCase(getVendorDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorDetails, toggleVendorFavourite } =
  VendorDetailsSlice.actions;
export default VendorDetailsSlice.reducer;
