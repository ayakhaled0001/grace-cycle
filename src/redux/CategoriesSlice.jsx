import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CategoriesBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/categories";

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(CategoriesBaseUrl);
      return response.data;
    } catch (error) {
      console.log("Error fetching categories:", error);
      return thunkAPI.rejectWithValue("Failed to fetch categories");
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
