import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
const BaseUrl = "https://gracecycleapi.azurewebsites.net/api/web/home/foods";

//fetching all food categories

export const fetchMainDishes = createAsyncThunk(
  "services/fetchMainDishes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}`);
      return response.data["Main Dishes"];
    } catch (error) {
      console.log("error fetching main dishes:", error);
      return thunkAPI.rejectWithValue("Failed to fetch main dishes");
    }
  }
);

export const fetchDrinks = createAsyncThunk(
  "services/fetchDrinks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}`);
      return response.data["Drinks"];
    } catch (error) {
      console.log("error fetching drinks :", error);
      return thunkAPI.rejectWithValue("Failed to fetch drinks");
    }
  }
);

export const fetchBakedGoods = createAsyncThunk(
  "services/fetchBakedGoods",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}`);
      return response.data["Baked goods"];
    } catch (error) {
      console.log("error fetching baked goods:", error);
      return thunkAPI.rejectWithValue("Failed to fetch baked goods");
    }
  }
);

export const fetchDessert = createAsyncThunk(
  "services/fetchDessert",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}`);
      return response.data["Dessert"];
    } catch (error) {
      console.log("error fetching desserts :", error);
      return thunkAPI.rejectWithValue("Failed to fetch desserts");
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
      .addCase(fetchMainDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.mainDishes = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false, // Ensure each item has an isFav property
        }));
      })
      .addCase(fetchMainDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.loading = false;
        state.mainDishes = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false, // Ensure each item has an isFav property
        }));
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchBakedGoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBakedGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.mainDishes = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false, // Ensure each item has an isFav property
        }));
      })
      .addCase(fetchBakedGoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchDessert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDessert.fulfilled, (state, action) => {
        state.loading = false;
        state.dessert = action.payload;
        state.isFav = action.payload.map((el) => el.isFavourite);
      })
      .addCase(fetchDessert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFav } = foodSlice.actions;
export default foodSlice.reducer;
