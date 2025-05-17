import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
const BaseUrl = "https://gracecycleapi.azurewebsites.net/api/web/home/foods";

//fetching all food categories

export const fetchMainDishes = createAsyncThunk(
  "services/fetchAllFoods",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`BaseUrl`);
      return response.data["Main Dishes"];
    } catch (error) {
      console.log("error fetching food categories :", error);
      return thunkAPI.rejectWithValue("Failed to fetch foods");
    }
  }
);

export const fetchAllFoods = createAsyncThunk(
  "services/fetchAllFoods",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://gracecycleapi.azurewebsites.net/api/web/home/foods"
      );
      return response.data;
    } catch (error) {
      console.log("error fetching food categories :", error);
      return thunkAPI.rejectWithValue("Failed to fetch foods");
    }
  }
);

// initial state

const initialState = {
  mainDishes: [],
  drinks: [],
  bakedGoods: [],
  dessert: [],
  isFav: false,
  loading: false,
  error: null,
};

// food slice

const foodSlice = createSlice({
  name: "servicesFood",
  initialState,
  reducers: {
    // will be handled from backend ---------
    toggleFav(state) {
      state.isFav = !state.isFav;
    },
    // --------------------------------------
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.mainDishes = action.payload || [];
        state.drinks = action.payload["Drinks"] || [];
        state.bakedGoods = action.payload["Baked goods"] || [];
        state.dessert = action.payload["Dessert"] || [];
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFav } = foodSlice.actions;
export default foodSlice.reducer;
