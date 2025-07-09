import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrlListing = "https://gracecycleapi.azurewebsites.net/api/Foods";

// Async thunk to fetch food listing details by foodId
export const fetchFoodListing = createAsyncThunk(
  "foodListing/fetchFoodListing",
  async (foodId, thunkAPI) => {
    try {
      console.log("Fetching food listing for ID:", foodId);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      const response = await axios.get(`${BaseUrlListing}/${foodId}`, config);
      console.log("Food listing response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching food listing:", error);
      console.error("Error details:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to fetch food listing");
    }
  }
);

const initialStateListing = {
  categories: [],
  vendorId: "",
  vendorOpeningTime: "",
  vendorClosingTime: "",
  description: "",
  similarItems: [],
  reviewsSummary: null,
  reviews: [],
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
