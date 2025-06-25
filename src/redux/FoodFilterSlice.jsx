import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FoodBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/web/discover/foods";

export const fetchAllFoods = createAsyncThunk(
  "foodFilter/fetchAllFoods",
  async (
    { search, sort, categoryId, maxPrice, pageIndex = 1, pageSize = 9 },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (categoryId) params.append("categoryId", categoryId);
      if (maxPrice) params.append("maxPrice", maxPrice);
      params.append("pageIndex", pageIndex);
      params.append("pageSize", pageSize);

      console.log(
        "Fetching foods from:",
        `${FoodBaseUrl}?${params.toString()}`
      );
      const response = await axios.get(`${FoodBaseUrl}?${params.toString()}`);
      console.log("Foods response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching foods:", error);
      return thunkAPI.rejectWithValue("Failed to fetch foods");
    }
  }
);

const initialState = {
  allFoods: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 9,
  searchTerm: "",
  searchType: "All",
  sortBy: "rating",
  categoryId: "",
  maxPriceFilter: "",
  loading: false,
  error: null,
  isSearchActive: false,
};

const foodFilterSlice = createSlice({
  name: "foodFilter",
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setMaxPriceFilter: (state, action) => {
      state.maxPriceFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearFilteredFoods: (state) => {
      state.allFoods = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.searchTerm = "";
      state.searchType = "All";
      state.sortBy = "rating";
      state.categoryId = "";
      state.maxPriceFilter = "";
      state.isSearchActive = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats
        if (action.payload && action.payload.data) {
          state.allFoods = action.payload.data;
          state.totalCount =
            action.payload.count ||
            action.payload.totalCount ||
            action.payload.data.length;
          state.currentPage = action.payload.pageIndex || 1;
          state.pageSize = action.payload.pageSize || 9;
        } else if (Array.isArray(action.payload)) {
          state.allFoods = action.payload;
          state.totalCount = action.payload.length;
          state.currentPage = 1;
          state.pageSize = 9;
        } else {
          state.allFoods = [];
          state.totalCount = 0;
        }
        state.isSearchActive = true;
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSearchType,
  setSortBy,
  setCategoryId,
  setMaxPriceFilter,
  setCurrentPage,
  clearFilteredFoods,
} = foodFilterSlice.actions;

export default foodFilterSlice.reducer;
