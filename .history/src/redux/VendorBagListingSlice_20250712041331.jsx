import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  vendorBags: [],
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

// =================== Request: Get Vendor Bag Listings =======================
export const getVendorBagListings = createAsyncThunk(
  "vendorBagListing/getVendorBagListings",
  async (_, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const response = await axios.get(`${BaseUrl}api/Bags/BagsListings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching vendor bag listings"
      );
    }
  }
);

// =================== Request: Delete Vendor Bag =======================
export const deleteVendorBag = createAsyncThunk(
  "vendorBagListing/deleteVendorBag",
  async (bagId, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      await axios.delete(`${BaseUrl}api/Bags/delete-bag/${bagId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return bagId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error deleting vendor bag"
      );
    }
  }
);

// =================== Vendor Bag Listing Slice =======================
export const VendorBagListingSlice = createSlice({
  name: "vendorBagListing",
  initialState,
  reducers: {
    clearVendorBagListings: (state) => {
      state.vendorBags = [];
      state.isLoading = false;
      state.error = null;
      state.totalCount = 0;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addVendorBag: (state, action) => {
      // Add a new bag to the beginning of the array
      const newBag = {
        id: state.vendorBags.length + 1,
        picUrl: action.payload.picUrl,
        name: action.payload.name,
        quantity: action.payload.quantity,
        price: action.payload.price || 0,
        newPrice: action.payload.newPrice,
        status: action.payload.quantity > 0 ? "active" : "inactive",
      };
      state.vendorBags.unshift(newBag);
      state.totalCount = state.vendorBags.length;
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Get Vendor Bag Listings *******************
      .addCase(getVendorBagListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVendorBagListings.fulfilled, (state, action) => {
        state.isLoading = false;
        // Transform the data to include additional fields
        state.vendorBags = action.payload.map((bag, index) => ({
          id: index + 1, // Add ID if not provided by API
          picUrl: bag.picUrl,
          name: bag.name,
          quantity: bag.quantity,
          price: bag.price || 0,
          newPrice: bag.newPrice,
          status: bag.quantity > 0 ? "active" : "inactive",
          discountPercentage:
            bag.price > 0
              ? Math.round(((bag.price - bag.newPrice) / bag.price) * 100)
              : 0,
        }));
        state.totalCount = action.payload.length;
      })
      .addCase(getVendorBagListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ***************** Delete Vendor Bag *******************
      .addCase(deleteVendorBag.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVendorBag.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted bag from the array
        state.vendorBags = state.vendorBags.filter(
          (bag) => bag.id !== action.payload
        );
        state.totalCount = state.vendorBags.length;
      })
      .addCase(deleteVendorBag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearVendorBagListings,
  setCurrentPage,
  setPageSize,
  clearError,
  addVendorBag,
} = VendorBagListingSlice.actions;

export default VendorBagListingSlice.reducer;
