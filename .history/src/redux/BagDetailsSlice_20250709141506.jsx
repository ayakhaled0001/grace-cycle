import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "https://gracecycleapi.azurewebsites.net/api/BagDetails";

// Thunk to fetch bag details by ID
export const fetchBagDetails = createAsyncThunk(
  "bagDetails/fetchBagDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseUrl}/${id}`);
      return response.data;
    } catch (err) {
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
