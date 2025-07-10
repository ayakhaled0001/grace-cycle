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

      // Find similar bags (other bags from the same vendor or with similar properties)
      const similarItems = bags
        .filter((otherBag) => {
          // Don't include the current bag itself
          if (
            otherBag.id?.toString() === id?.toString() ||
            otherBag.bagId?.toString() === id?.toString() ||
            otherBag._id?.toString() === id?.toString()
          ) {
            return false;
          }

          // Include bags from the same vendor
          if (
            bag.vendorId &&
            otherBag.vendorId &&
            bag.vendorId === otherBag.vendorId
          ) {
            return true;
          }

          // Include bags with similar discount percentage (within 10%)
          if (bag.discount && otherBag.discount) {
            const discountDiff = Math.abs(bag.discount - otherBag.discount);
            if (discountDiff <= 10) {
              return true;
            }
          }

          // Include bags with similar price range (within 20%)
          if (bag.newPrice && otherBag.newPrice) {
            const priceDiff = Math.abs(bag.newPrice - otherBag.newPrice);
            const priceThreshold = bag.newPrice * 0.2;
            if (priceDiff <= priceThreshold) {
              return true;
            }
          }

          return false;
        })
        .slice(0, 3); // Limit to 3 similar bags

      // Return the bag with populated similarItems
      return {
        ...bag,
        similarItems,
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
