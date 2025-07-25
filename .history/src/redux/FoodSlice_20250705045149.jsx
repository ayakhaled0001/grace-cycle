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
    toggleFav(state, action) {
      const { id } = action.payload; // Get the item's id from the action

      // Update mainDishes
      state.mainDishes = state.mainDishes.map((item) =>
        item.id === id ? { ...item, isFav: !item.isFav } : item
      );

      // Update drinks
      state.drinks = state.drinks.map((item) =>
        item.id === id ? { ...item, isFav: !item.isFav } : item
      );

      // Update bakedGoods
      state.bakedGoods = state.bakedGoods.map((item) =>
        item.id === id ? { ...item, isFav: !item.isFav } : item
      );

      // Update dessert
      state.dessert = state.dessert.map((item) =>
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
      });
  },
});

export const { toggleFav } = foodSlice.actions;
export default foodSlice.reducer;

// const BaseUrlListing = "https://gracecycleapi.azurewebsites.net/api/web/home/food-listing";

// // Async thunk to fetch food listing details by foodId
// export const fetchFoodListing = createAsyncThunk(
//   "foodListing/fetchFoodListing",
//   async (foodId, thunkAPI) => {
//     try {
//       const response = await axios.get(`${BaseUrlListing}/${foodId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch food listing");
//     }
//   }
// );

// const initialStateListing = {
//   categories: [],
//   vendorOpeningTime: "",
//   vendorClosingTime: "",
//   description: "",
//   similarItems: [],
//   reviewsSummary: null,
//   reviews: [],
//   originalPriceFormatted: "",
//   discountedPriceFormatted: "",
//   quantityAvailableDisplay: "",
//   operatingHours: "",
//   id: null,
//   name: "",
//   picUrl: "",
//   rating: null,
//   isFavourite: false,
//   quantity: null,
//   unitPrice: null,
//   newPrice: null,
//   discountPercentage: null,
//   vName: "",
//   isLoading: false,
//   error: null,
// };

// const foodListingSlice = createSlice({
//   name: "foodListing",
//   initialState: initialStateListing,
//   reducers: {
//     clearFoodListing: (state) => {
//       Object.assign(state, initialStateListing);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFoodListing.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchFoodListing.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // Spread all fields from the response into the state
//         Object.assign(state, action.payload);
//       })
//       .addCase(fetchFoodListing.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearFoodListing } = foodListingSlice.actions;
// export default foodListingSlice.reducer;
