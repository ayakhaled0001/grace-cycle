import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  vendorListings: [],
  isLoading: false,
  error: "",
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

// =================== Request: Get Vendor Listings =======================
export const getVendorListings = createAsyncThunk(
  "vendorListing/getVendorListings",
  async (_, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      const response = await axios.get(
        `${BaseUrl}api/Foods/FoodsListing`,
        config
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching vendor listings"
      );
    }
  }
);

// =================== Request: Add New Listing =======================
export const addVendorListing = createAsyncThunk(
  "vendorListing/addVendorListing",
  async (listingData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      const response = await axios.post(
        `${BaseUrl}api/Foods/AddFood`,
        listingData,
        config
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error adding vendor listing"
      );
    }
  }
);

// =================== Request: Update Listing =======================
export const updateVendorListing = createAsyncThunk(
  "vendorListing/updateVendorListing",
  async ({ id, listingData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      const response = await axios.put(
        `${BaseUrl}api/Foods/UpdateFood/${id}`,
        listingData,
        config
      );
      return { id, data: response.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error updating vendor listing"
      );
    }
  }
);

// =================== Request: Delete Listing =======================
export const deleteVendorListing = createAsyncThunk(
  "vendorListing/deleteVendorListing",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      await axios.delete(`${BaseUrl}api/Foods/DeleteFood/${id}`, config);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error deleting vendor listing"
      );
    }
  }
);

// =================== Vendor Listing Slice =======================
export const VendorListingSlice = createSlice({
  name: "vendorListing",
  initialState,
  reducers: {
    clearVendorListings: (state) => {
      state.vendorListings = [];
      state.isLoading = false;
      state.error = "";
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
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Get Vendor Listings *******************
      .addCase(getVendorListings.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getVendorListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendorListings = action.payload.map((item, index) => ({
          id: index + 1, // Add ID if not provided by API
          name: item.name,
          picUrl: item.picUrl,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          newPrice: item.newPrice,
          status: item.quantity > 0 ? "active" : "inactive",
          discountPercentage:
            item.unitPrice > 0
              ? Math.round(
                  ((item.unitPrice - item.newPrice) / item.unitPrice) * 100
                )
              : 0,
        }));
        state.totalCount = action.payload.length;
      })
      .addCase(getVendorListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ***************** Add Vendor Listing *******************
      .addCase(addVendorListing.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addVendorListing.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new listing to the beginning of the array
        const newListing = {
          id: state.vendorListings.length + 1,
          name: action.payload.name,
          picUrl: action.payload.picUrl,
          quantity: action.payload.quantity,
          unitPrice: action.payload.unitPrice,
          newPrice: action.payload.newPrice,
          status: action.payload.quantity > 0 ? "active" : "inactive",
          discountPercentage:
            action.payload.unitPrice > 0
              ? Math.round(
                  ((action.payload.unitPrice - action.payload.newPrice) /
                    action.payload.unitPrice) *
                    100
                )
              : 0,
        };
        state.vendorListings.unshift(newListing);
        state.totalCount += 1;
      })
      .addCase(addVendorListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ***************** Update Vendor Listing *******************
      .addCase(updateVendorListing.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateVendorListing.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, data } = action.payload;
        const index = state.vendorListings.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.vendorListings[index] = {
            ...state.vendorListings[index],
            name: data.name,
            picUrl: data.picUrl,
            quantity: data.quantity,
            unitPrice: data.unitPrice,
            newPrice: data.newPrice,
            status: data.quantity > 0 ? "active" : "inactive",
            discountPercentage:
              data.unitPrice > 0
                ? Math.round(
                    ((data.unitPrice - data.newPrice) / data.unitPrice) * 100
                  )
                : 0,
          };
        }
      })
      .addCase(updateVendorListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ***************** Delete Vendor Listing *******************
      .addCase(deleteVendorListing.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteVendorListing.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.payload;
        state.vendorListings = state.vendorListings.filter(
          (item) => item.id !== deletedId
        );
        state.totalCount -= 1;
      })
      .addCase(deleteVendorListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorListings, setCurrentPage, setPageSize, clearError } =
  VendorListingSlice.actions;

export default VendorListingSlice.reducer;
