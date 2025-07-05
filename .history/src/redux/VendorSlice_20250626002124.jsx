import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  vendors: [], // Store vendor data from the server
  isLoading: false,
  error: "",
  count: 0,
  pageIndex: 1,
  pageSize: 10,
};

// =================== Request: Get Vendors =======================
export const getVendors = createAsyncThunk(
  "vendors/getVendors",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}api/web/home/vendors`);
      return response.data; // Return the complete response data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching vendors"
      );
    }
  }
);

// =================== Vendor Slice =======================
export const VendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    clearState: (state) => {
      state.vendors = [];
      state.isLoading = false;
      state.error = "";
      state.count = 0;
      state.pageIndex = 1;
      state.pageSize = 10;
    },
    toggleFavourite: (state, action) => {
      const vendorId = action.payload;
      const vendor = state.vendors.find((v) => v.userId === vendorId);
      if (vendor) {
        vendor.isFavourite = !vendor.isFavourite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Get Vendors *******************
      .addCase(getVendors.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendors = action.payload.data; // Store the vendors array
        state.count = action.payload.count;
        state.pageIndex = action.payload.pageIndex;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getVendors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState, toggleFavourite } = VendorSlice.actions;
export default VendorSlice.reducer;
