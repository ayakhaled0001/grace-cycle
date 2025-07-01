import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const VendorBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/web/discover/vendors";
const FavVendorBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/web/fav/vendors";

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

// Fetch user favorite vendors
export const fetchUserFavoriteVendors = createAsyncThunk(
  "vendorFilter/fetchUserFavoriteVendors",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found");
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(FavVendorBaseUrl, config);
      return response.data;
    } catch (error) {
      let errorMessage = "Failed to load favorite vendors";
      if (error.response?.status === 401) {
        errorMessage = "Please login again to view your favorites";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: true,
      });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Toggle vendor favorite
export const toggleVendorFavorite = createAsyncThunk(
  "vendorFilter/toggleVendorFavorite",
  async ({ vendorId, isCurrentlyFavorited }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "Please login to manage your favorites",
          showConfirmButton: true,
        });
        return thunkAPI.rejectWithValue("No authentication token found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let response;
      if (isCurrentlyFavorited) {
        // Remove from favorites (DELETE)
        response = await axios.delete(
          `${FavVendorBaseUrl}/${vendorId}`,
          config
        );
      } else {
        // Add to favorites (POST)
        response = await axios.post(
          `${FavVendorBaseUrl}?vendorId=${vendorId}`,
          {},
          config
        );
      }
      const message =
        response.data.message || "Vendor updated in favorites successfully";
      const isAdded = !isCurrentlyFavorited;
      Swal.fire({
        icon: "success",
        title: isAdded ? "Added to Favorites!" : "Removed from Favorites!",
        text: message,
        showConfirmButton: false,
        timer: 2000,
      });
      return { vendorId, response: response.data, isAdded };
    } catch (error) {
      let errorMessage = "Failed to update favorite status";
      if (error.response?.status === 400) {
        errorMessage =
          "This vendor is already in your favorites or doesn't exist";
      } else if (error.response?.status === 401) {
        errorMessage = "Please login again to continue";
      } else if (error.response?.status === 404) {
        errorMessage = "Vendor not found";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: true,
      });
      return thunkAPI.rejectWithValue(errorMessage);
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
  favoriteVendors: [],
  favVendorsLoading: false,
  favVendorsError: null,
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
      })
      // fetchUserFavoriteVendors
      .addCase(fetchUserFavoriteVendors.pending, (state) => {
        state.favVendorsLoading = true;
        state.favVendorsError = null;
      })
      .addCase(fetchUserFavoriteVendors.fulfilled, (state, action) => {
        state.favVendorsLoading = false;
        if (Array.isArray(action.payload)) {
          state.favoriteVendors = action.payload.map((v) => ({
            ...v,
            isFav: true,
          }));
        } else if (
          action.payload &&
          action.payload.data &&
          Array.isArray(action.payload.data)
        ) {
          state.favoriteVendors = action.payload.data.map((v) => ({
            ...v,
            isFav: true,
          }));
        } else {
          state.favoriteVendors = [];
        }
      })
      .addCase(fetchUserFavoriteVendors.rejected, (state, action) => {
        state.favVendorsLoading = false;
        state.favVendorsError = action.payload;
      })
      // toggleVendorFavorite
      .addCase(toggleVendorFavorite.fulfilled, (state, action) => {
        const { vendorId, isAdded } = action.payload;
        // Update allVendors array
        state.allVendors = state.allVendors.map((item) =>
          item.userId === vendorId || item.id === vendorId
            ? { ...item, isFavourite: isAdded, isFav: isAdded }
            : item
        );
        // Update favoriteVendors array
        if (isAdded) {
          // Add to favorites if not already there
          const existingItem = state.favoriteVendors.find(
            (item) => item.userId === vendorId || item.id === vendorId
          );
          if (!existingItem) {
            const vendorItem = state.allVendors.find(
              (item) => item.userId === vendorId || item.id === vendorId
            );
            if (vendorItem) {
              state.favoriteVendors.push({ ...vendorItem, isFav: true });
            }
          }
        } else {
          // Remove from favorites
          state.favoriteVendors = state.favoriteVendors.filter(
            (item) => item.userId !== vendorId && item.id !== vendorId
          );
        }
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
// export { fetchUserFavoriteVendors, toggleVendorFavorite };
