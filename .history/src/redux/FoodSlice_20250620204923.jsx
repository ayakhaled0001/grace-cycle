import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
const BaseUrl = "https://gracecycleapi.azurewebsites.net/api/web/";

//fetching all food categories

export const fetchMainDishes = createAsyncThunk(
  "services/fetchMainDishes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}home/foods`);
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
      const response = await axios.get(`${BaseUrl}home/foods`);
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
      const response = await axios.get(`${BaseUrl}home/foods`);
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
      const response = await axios.get(`${BaseUrl}home/foods`);
      return response.data["Dessert"];
    } catch (error) {
      console.log("error fetching desserts :", error);
      return thunkAPI.rejectWithValue("Failed to fetch desserts");
    }
  }
);

export const fetchMagicBags = createAsyncThunk(
  "services/fetchMagicBags",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BaseUrl}discover/bags`);
      return response.data.data; // The actual bags are in the 'data' array
    } catch (error) {
      console.error("error fetching magic bags:", error);
      return thunkAPI.rejectWithValue("Failed to fetch magic bags");
    }
  }
);

// initial state

const initialState = {
  mainDishes: [],
  drinks: [],
  bakedGoods: [],
  dessert: [],
  magicBags: [],
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
    toggleFav(state, action) {
      const { id } = action.payload; // Get the item's id from the action
      state.mainDishes = state.mainDishes.map((item) =>
        item.id === id ? { ...item, isFav: !item.isFav } : item
      );
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
      })
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.loading = false;
        state.drinks = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false, // Ensure each item has an isFav property
        }));
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBakedGoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBakedGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.bakedGoods = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false, // Ensure each item has an isFav property
        }));
      })
      .addCase(fetchBakedGoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDessert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDessert.fulfilled, (state, action) => {
        state.loading = false;
        state.dessert = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false, // Ensure each item has an isFav property
        }));
      })
      .addCase(fetchDessert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMagicBags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMagicBags.fulfilled, (state, action) => {
        state.loading = false;
        state.magicBags = action.payload.map((item) => ({
          ...item,
          isFav: item.isFavourite || false,
        }));
      })
      .addCase(fetchMagicBags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFav } = foodSlice.actions;
export default foodSlice.reducer;
