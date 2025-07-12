import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

// =================== Request: Add Bag =======================
export const addBag = createAsyncThunk(
  "addBag/addBag",
  async (bagData, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const response = await axios.post(`${BaseUrl}api/Bags/add-Bag`, bagData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // "Bag added successfully"
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error adding bag"
      );
    }
  }
);

// =================== Add Bags Slice =======================
export const AddBagsSlice = createSlice({
  name: "addBag",
  initialState,
  reducers: {
    clearAddBagState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
    resetSuccess: (state) => {
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ***************** Add Bag *******************
      .addCase(addBag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })
      .addCase(addBag.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload; // "Bag added successfully"
        state.error = null;
      })
      .addCase(addBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = "";
      });
  },
});

export const { clearAddBagState, resetSuccess } = AddBagsSlice.actions;
export default AddBagsSlice.reducer;
