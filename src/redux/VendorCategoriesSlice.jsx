import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VendorCategoriesBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/Vendors/vendortypes";

// Async thunk for fetching vendor categories
export const fetchVendorCategories = createAsyncThunk(
  "vendorCategories/fetchVendorCategories",
  async (_, thunkAPI) => {
    try {
      console.log("Fetching vendor categories from:", VendorCategoriesBaseUrl);
      const response = await axios.get(VendorCategoriesBaseUrl);
      console.log("Vendor categories response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching vendor categories:", error);
      return thunkAPI.rejectWithValue("Failed to fetch vendor categories");
    }
  }
);

const initialState = {
  vendorCategories: [],
  loading: false,
  error: null,
};

const vendorCategoriesSlice = createSlice({
  name: "vendorCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorCategories = action.payload;
      })
      .addCase(fetchVendorCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorCategoriesSlice.reducer;
