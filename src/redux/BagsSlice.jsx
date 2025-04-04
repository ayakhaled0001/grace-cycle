import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  bags: [], // تخزين البيانات القادمة من السيرفر
  isLoading: false,
  error: "",
};

// =================== Request: Get Bags =======================
export const getBags = createAsyncThunk(
  "bags/getBags",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}api/web/home/bags`);
      return response.data; // البيانات القادمة من السيرفر
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching bags");
    }
  }
);

// =================== Bags Slice =======================
export const BagsSlice = createSlice({
  name: "bags",
  initialState,
  reducers: {
    clearState: (state) => {
      state.bags = [];
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Get Bags *******************
      .addCase(getBags.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getBags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bags = action.payload; // تخزين البيانات القادمة من السيرفر
      })
      .addCase(getBags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = BagsSlice.actions;
export default BagsSlice.reducer;
