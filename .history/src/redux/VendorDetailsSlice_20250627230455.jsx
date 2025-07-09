import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  vendorDetails: null,
  itemsOffered: [],
  similarItems: [],
  isLoading: false,
  error: "",
};

// =================== Request: Get Vendor Details =======================
export const getVendorDetails = createAsyncThunk(
  "vendorDetails/getVendorDetails",
  async (vendorId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/VendorDetails/${vendorId}`
      );
      return response.data;
    } catch (err) {
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
