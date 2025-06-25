import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VendorBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/web/discover/vendors";

export const fetchAllVendors = createAsyncThunk(
  "vendorFilter/fetchAllVendors",
  async (
    { search, sort, vendorTypeId, pageIndex = 1, pageSize = 9 },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (vendorTypeId) params.append("VendorTypeId", vendorTypeId);
      params.append("pageIndex", pageIndex);
      params.append("pageSize", pageSize);

      console.log(
        "Fetching vendors from:",
        `${VendorBaseUrl}?${params.toString()}`
      );
      const response = await axios.get(`${VendorBaseUrl}?${params.toString()}`);
      console.log("Vendors response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching vendors:", error);
      return thunkAPI.rejectWithValue("Failed to fetch vendors");
    }
  }
);

const initialState = {
  allVendors: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 9,
  searchTerm: "",
  searchType: "All",
  sortBy: "rating",
  vendorTypeId: "",
  loading: false,
  error: null,
  isSearchActive: false,
};

const vendorFilterSlice = createSlice({
  name: "vendorFilter",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setVendorTypeId: (state, action) => {
      state.vendorTypeId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearFilteredVendors: (state) => {
      state.allVendors = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.searchTerm = "";
      state.searchType = "All";
      state.sortBy = "rating";
      state.vendorTypeId = "";
      state.isSearchActive = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        if (action.payload && action.payload.data) {
          state.allVendors = action.payload.data;
          state.totalCount =
            action.payload.count ||
            action.payload.totalCount ||
            action.payload.data.length;
          state.currentPage = action.payload.pageIndex || 1;
          state.pageSize = action.payload.pageSize || 9;
        } else if (Array.isArray(action.payload)) {
          state.allVendors = action.payload;
          state.totalCount = action.payload.length;
          state.currentPage = 1;
          state.pageSize = 9;
        } else {
          state.allVendors = [];
          state.totalCount = 0;
        }
        state.isSearchActive = true;
      })
      .addCase(fetchAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSearchType,
  setSortBy,
  setVendorTypeId,
  setCurrentPage,
  clearFilteredVendors,
} = vendorFilterSlice.actions;

export default vendorFilterSlice.reducer;
