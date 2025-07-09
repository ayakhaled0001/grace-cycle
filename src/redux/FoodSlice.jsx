import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
//
const BaseUrl = "https://gracecycleapi.azurewebsites.net/api/web/home/foods";
const FavBaseUrl = "https://gracecycleapi.azurewebsites.net/api/web/fav/foods";

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

// Toggle favorite API call
export const toggleFavorite = createAsyncThunk(
  "services/toggleFavorite",
  async ({ foodId, isCurrentlyFavorited }, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "Please login to manage your favorites",
          showConfirmButton: true,
        });
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log(
        `Sending ${
          isCurrentlyFavorited ? "DELETE" : "POST"
        } favorite request for foodId: ${foodId}`
      );

      let response;
      if (isCurrentlyFavorited) {
        // Remove from favorites - DELETE request
        response = await axios.delete(`${FavBaseUrl}/${foodId}`, config);
      } else {
        // Add to favorites - POST request
        response = await axios.post(
          `${FavBaseUrl}?foodId=${foodId}`,
          {},
          config
        );
      }

      console.log("Favorite API Response:", response.data);

      // Show success message
      const message =
        response.data.message || "Food item updated in favorites successfully";
      const isAdded = !isCurrentlyFavorited;

      Swal.fire({
        icon: "success",
        title: isAdded ? "Added to Favorites!" : "Removed from Favorites!",
        text: message,
        showConfirmButton: false,
        timer: 2000,
      });

      return { foodId, response: response.data, isAdded };
    } catch (error) {
      console.log("Error toggling favorite for foodId:", foodId);
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Show error message
      let errorMessage = "Failed to update favorite status";

      if (error.response?.status === 400) {
        errorMessage =
          "This item is already in your favorites or doesn't exist";
      } else if (error.response?.status === 401) {
        errorMessage = "Please login again to continue";
      } else if (error.response?.status === 404) {
        errorMessage = "Food item not found";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: true,
      });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Fetch user favorite foods
export const fetchUserFavoriteFoods = createAsyncThunk(
  "services/fetchUserFavoriteFoods",
  async (_, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage");
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Fetching user favorite foods...");
      const response = await axios.get(FavBaseUrl, config);
      console.log("Favorite foods response:", response.data);

      return response.data;
    } catch (error) {
      console.log("Error fetching favorite foods");
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Show error message
      let errorMessage = "Failed to load favorite foods";

      if (error.response?.status === 401) {
        errorMessage = "Please login again to view your favorites";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: true,
      });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Add to cart thunk
export const addToCart = createAsyncThunk(
  "services/addToCart",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://gracecycleapi.azurewebsites.net/api/webcart/add-item",
        payload,
        config
      );
      console.log("Add to cart response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error adding to cart:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add to cart"
      );
    }
  }
);

// Fetch user cart thunk
export const fetchUserCart = createAsyncThunk(
  "services/fetchUserCart",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://gracecycleapi.azurewebsites.net/api/webcart",
        config
      );
      console.log("Fetch user cart response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user cart:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user cart"
      );
    }
  }
);

// Fetch cart details thunk
export const fetchCartDetails = createAsyncThunk(
  "services/fetchCartDetails",
  async (vendorId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://gracecycleapi.azurewebsites.net/api/webcart/${vendorId}`,
        config
      );
      console.log("Fetch cart details response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching cart details:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch cart details"
      );
    }
  }
);

// Update cart item thunk
export const updateCartItem = createAsyncThunk(
  "services/updateCartItem",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        "https://gracecycleapi.azurewebsites.net/api/webcart/update-item",
        payload,
        config
      );
      console.log("Update cart item response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating cart item:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update cart item"
      );
    }
  }
);

// initial state

const initialState = {
  mainDishes: [],
  drinks: [],
  bakedGoods: [],
  dessert: [],
  favoriteFoods: [],
  isFav: false,
  loading: false,
  error: null,
  cart: [],
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
        console.log("Main Dishes data from backend:", action.payload);
        state.mainDishes = action.payload.map((item) => {
          console.log(
            `Food item ${item.id} (${item.name}) - isFavourite:`,
            item.isFavourite
          );
          return {
            ...item,
            isFav: item.isFavourite || false, // Ensure each item has an isFav property
          };
        });
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
        console.log("Drinks data from backend:", action.payload);
        state.drinks = action.payload.map((item) => {
          console.log(
            `Drink item ${item.id} (${item.name}) - isFavourite:`,
            item.isFavourite
          );
          return {
            ...item,
            isFav: item.isFavourite || false, // Ensure each item has an isFav property
          };
        });
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
        console.log("Baked Goods data from backend:", action.payload);
        state.bakedGoods = action.payload.map((item) => {
          console.log(
            `Baked Good item ${item.id} (${item.name}) - isFavourite:`,
            item.isFavourite
          );
          return {
            ...item,
            isFav: item.isFavourite || false, // Ensure each item has an isFav property
          };
        });
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
        console.log("Dessert data from backend:", action.payload);
        state.dessert = action.payload.map((item) => {
          console.log(
            `Dessert item ${item.id} (${item.name}) - isFavourite:`,
            item.isFavourite
          );
          return {
            ...item,
            isFav: item.isFavourite || false, // Ensure each item has an isFav property
          };
        });
      })
      .addCase(fetchDessert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserFavoriteFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavoriteFoods.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Favorite foods response payload:", action.payload);
        console.log("Payload type:", typeof action.payload);
        console.log("Payload is array:", Array.isArray(action.payload));

        // Handle different response formats
        if (Array.isArray(action.payload)) {
          state.favoriteFoods = action.payload;
        } else if (
          action.payload &&
          action.payload.data &&
          Array.isArray(action.payload.data)
        ) {
          state.favoriteFoods = action.payload.data;
        } else if (
          action.payload &&
          action.payload.items &&
          Array.isArray(action.payload.items)
        ) {
          state.favoriteFoods = action.payload.items;
        } else {
          console.log("Unexpected payload format, setting empty array");
          state.favoriteFoods = [];
        }

        console.log("Favorite foods updated in state:", state.favoriteFoods);
      })
      .addCase(fetchUserFavoriteFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { foodId, isAdded } = action.payload;
        console.log(
          `Toggling favorite for foodId: ${foodId}, isAdded: ${isAdded}`
        );
        console.log("Response data:", action.payload.response);

        // Update all food arrays to toggle the favorite status
        state.mainDishes = state.mainDishes.map((item) => {
          if (item.id === foodId) {
            console.log(
              `Updating mainDish ${item.id} (${item.name}) - isFav from ${item.isFav} to ${isAdded}`
            );
            return { ...item, isFav: isAdded };
          }
          return item;
        });

        state.drinks = state.drinks.map((item) => {
          if (item.id === foodId) {
            console.log(
              `Updating drink ${item.id} (${item.name}) - isFav from ${item.isFav} to ${isAdded}`
            );
            return { ...item, isFav: isAdded };
          }
          return item;
        });

        state.bakedGoods = state.bakedGoods.map((item) => {
          if (item.id === foodId) {
            console.log(
              `Updating bakedGood ${item.id} (${item.name}) - isFav from ${item.isFav} to ${isAdded}`
            );
            return { ...item, isFav: isAdded };
          }
          return item;
        });

        state.dessert = state.dessert.map((item) => {
          if (item.id === foodId) {
            console.log(
              `Updating dessert ${item.id} (${item.name}) - isFav from ${item.isFav} to ${isAdded}`
            );
            return { ...item, isFav: isAdded };
          }
          return item;
        });

        // Update favoriteFoods array
        if (isAdded) {
          // Add to favorites if not already there
          const existingItem = state.favoriteFoods.find(
            (item) => item.id === foodId
          );
          if (!existingItem) {
            // Find the food item from other arrays and add it to favorites
            const foodItem =
              state.mainDishes.find((item) => item.id === foodId) ||
              state.drinks.find((item) => item.id === foodId) ||
              state.bakedGoods.find((item) => item.id === foodId) ||
              state.dessert.find((item) => item.id === foodId);
            if (foodItem) {
              state.favoriteFoods.push(foodItem);
            }
          }
        } else {
          // Remove from favorites
          state.favoriteFoods = state.favoriteFoods.filter(
            (item) => item.id !== foodId
          );
        }
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Add to cart fulfilled payload:", action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Add to cart rejected:", action.payload);
      })
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetch user cart fulfilled payload:", action.payload);
        state.cart = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Fetch user cart rejected:", action.payload);
      })
      .addCase(fetchCartDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetch cart details fulfilled payload:", action.payload);
        // Assuming action.payload is the cart details data from the backend
        // You might want to update your cart details state here if you have a cart details slice
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Fetch cart details rejected:", action.payload);
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Update cart item fulfilled payload:", action.payload);
        // Assuming action.payload is the updated cart details from the backend
        // You might want to update your cart state here if you have a cart slice
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Update cart item rejected:", action.payload);
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
