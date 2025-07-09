import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrlListing =
  "https://gracecycleapi.azurewebsites.net/api/web/home/food-listing";

// Async thunk to fetch food listing details by foodId
export const fetchFoodListing = createAsyncThunk(
  "foodListing/fetchFoodListing",
  async (foodId, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrlListing}/${foodId}`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch food listing");
    }
  }
);

const initialStateListing = {
  categories: [],
  vendorOpeningTime: "",
  vendorClosingTime: "",
  description: "",
  similarItems: [],
  reviewsSummary: null,
  reviews: [],
  originalPriceFormatted: "",
  discountedPriceFormatted: "",
  quantityAvailableDisplay: "",
  operatingHours: "",
  id: null,
  name: "",
  picUrl: "",
  rating: null,
  isFavourite: false,
  quantity: null,
  unitPrice: null,
  newPrice: null,
  discountPercentage: null,
  vName: "",
  isLoading: false,
  error: null,
};

const foodListingSlice = createSlice({
  name: "foodListing",
  initialState: initialStateListing,
  reducers: {
    clearFoodListing: (state) => {
      Object.assign(state, initialStateListing);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoodListing.fulfilled, (state, action) => {
        state.isLoading = false;
        // Spread all fields from the response into the state
        Object.assign(state, action.payload);
      })
      .addCase(fetchFoodListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFoodListing } = foodListingSlice.actions;
export default foodListingSlice.reducer;
