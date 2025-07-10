import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Try using the same pattern as food details
const BaseUrl = "https://gracecycleapi.azurewebsites.net/api/web/home/bags";

// Thunk to fetch bag details by ID
export const fetchBagDetails = createAsyncThunk(
  "bagDetails/fetchBagDetails",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      // First try to get all bags and find the specific one
      const response = await axios.get(BaseUrl, config);
      const bags = response.data;

      // Find the specific bag by ID
      const bag = bags.find(
        (bag) =>
          bag.id?.toString() === id?.toString() ||
          bag.bagId?.toString() === id?.toString() ||
          bag._id?.toString() === id?.toString()
      );

      if (!bag) {
        return rejectWithValue("Bag not found");
      }

      // For now, return the bag with empty similarItems since we don't have a specific endpoint
      return {
        ...bag,
        similarItems: [], // Will be populated later if needed
        reviewsSummary: null,
        reviews: [],
      };
    } catch (err) {
      console.error("Error fetching bag details:", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  bag: {
    vendorId: "",
    vendorOpeningTime: "",
    vendorClosingTime: "",
    description: "",
    similarItems: [],
    reviewsSummary: null,
    id: null,
    name: "",
    picUrl: "",
    quantity: 0,
    price: 0,
    newPrice: 0,
    discount: 0,
    rating: 0,
    vName: "",
    opened: false,
    isFavourite: false,
    foods: [],
  },
  isLoading: false,
  error: null,
};

const bagDetailsSlice = createSlice({
  name: "bagDetails",
  initialState,
  reducers: {
    clearBagDetails: (state) => {
      state.bag = initialState.bag;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBagDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBagDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bag = action.payload;
      })
      .addCase(fetchBagDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBagDetails } = bagDetailsSlice.actions;
export default bagDetailsSlice.reducer;
