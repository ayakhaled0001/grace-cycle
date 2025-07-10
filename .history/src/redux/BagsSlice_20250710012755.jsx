import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

const BagsBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/web/discover/bags";

// =================== Initial State =======================
const initialState = {
  bags: [], // تخزين البيانات القادمة من السيرفر
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
  maxPriceFilter: "",
  searchTerm: "",
  sortBy: "",
};

// =================== Request: Get Bags =======================
export const getBags = createAsyncThunk("bags/getBags", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BaseUrl}api/web/home/bags`);
    return response.data; // البيانات القادمة من السيرفر
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Error fetching bags"
    );
  }
});

export const fetchAllBags = createAsyncThunk(
  "bags/fetchAllBags",
  async (
    { search, sort, maxPrice, pageIndex = 1, pageSize = 10 },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (maxPrice) params.append("maxPrice", maxPrice);
      params.append("pageIndex", pageIndex);
      params.append("pageSize", pageSize);
      const response = await axios.get(`${BagsBaseUrl}?${params.toString()}`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch bags");
    }
  }
);

// =================== Bags Slice =======================
export const BagsSlice = createSlice({
  name: "bags",
  initialState,
  reducers: {
    clearBagsState: (state) => {
      state.bags = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.pageSize = 10;
      state.loading = false;
      state.error = null;
    },
    setBagsPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setMaxPriceFilter: (state, action) => {
      state.maxPriceFilter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateBags: (state, action) => {
      state.bags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Get Bags *******************
      .addCase(getBags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBags.fulfilled, (state, action) => {
        state.loading = false;
        // Preserve favorite status when updating bags
        const newBags = action.payload;
        const existingBags = state.bags;

        // Merge new bags with existing bags, preserving favorite status
        const mergedBags = newBags.map((newBag) => {
          const existingBag = existingBags.find(
            (existing) =>
              existing.id?.toString() === newBag.id?.toString() ||
              existing.bagId?.toString() === newBag.bagId?.toString() ||
              existing._id?.toString() === newBag._id?.toString()
          );

          if (existingBag && (existingBag.isFavourite || existingBag.isFav)) {
            return { ...newBag, isFavourite: true, isFav: true };
          }

          return newBag;
        });

        state.bags = mergedBags;
      })
      .addCase(getBags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllBags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBags.fulfilled, (state, action) => {
        state.loading = false;
        state.bags = action.payload.data || [];
        state.totalCount = action.payload.count || 0;
        state.currentPage = action.payload.pageIndex || 1;
        state.pageSize = action.payload.pageSize || 10;
      })
      .addCase(fetchAllBags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearBagsState,
  setBagsPage,
  setMaxPriceFilter,
  setSearchTerm,
  setSortBy,
  updateBags,
} = BagsSlice.actions;
export default BagsSlice.reducer;
