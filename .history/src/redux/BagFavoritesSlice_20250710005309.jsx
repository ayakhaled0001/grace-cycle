import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const FavBagBaseUrl =
  "https://gracecycleapi.azurewebsites.net/api/web/fav/bags";

// Toggle bag favorite API call
export const toggleBagFavorite = createAsyncThunk(
  "bagFavorites/toggleBagFavorite",
  async ({ bagId, isCurrentlyFavorited }, thunkAPI) => {
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
        } favorite request for bagId: ${bagId}`
      );

      let response;
      if (isCurrentlyFavorited) {
        // Remove from favorites - DELETE request
        response = await axios.delete(`${FavBagBaseUrl}/${bagId}`, config);
      } else {
        // Add to favorites - POST request
        response = await axios.post(
          `${FavBagBaseUrl}?bagId=${bagId}`,
          {},
          config
        );
      }

      console.log("Bag Favorite API Response:", response.data);

      // Show success message
      const message =
        response.data.message || "Bag updated in favorites successfully";
      const isAdded = !isCurrentlyFavorited;

      Swal.fire({
        icon: "success",
        title: isAdded ? "Added to Favorites!" : "Removed from Favorites!",
        text: message,
        showConfirmButton: false,
        timer: 2000,
      });

      return { bagId, response: response.data, isAdded };
    } catch (error) {
      console.log("Error toggling bag favorite for bagId:", bagId);
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Show error message
      let errorMessage = "Failed to update favorite status";

      if (error.response?.status === 400) {
        errorMessage = "This bag is already in your favorites or doesn't exist";
      } else if (error.response?.status === 401) {
        errorMessage = "Please login again to continue";
      } else if (error.response?.status === 404) {
        errorMessage = "Bag not found";
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

// Fetch user favorite bags
export const fetchUserFavoriteBags = createAsyncThunk(
  "bagFavorites/fetchUserFavoriteBags",
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

      console.log("Fetching user favorite bags...");
      const response = await axios.get(FavBagBaseUrl, config);
      console.log("Favorite bags response:", response.data);

      return response.data;
    } catch (error) {
      console.log("Error fetching favorite bags");
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });

      // Show error message
      let errorMessage = "Failed to load favorite bags";

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

const initialState = {
  favoriteBags: [],
  loading: false,
  error: null,
};

const bagFavoritesSlice = createSlice({
  name: "bagFavorites",
  initialState,
  reducers: {
    clearBagFavorites: (state) => {
      state.favoriteBags = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavoriteBags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavoriteBags.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Favorite bags response payload:", action.payload);
        console.log("Payload type:", typeof action.payload);
        console.log("Payload is array:", Array.isArray(action.payload));

        // Handle different response formats
        if (Array.isArray(action.payload)) {
          state.favoriteBags = action.payload;
        } else if (
          action.payload &&
          action.payload.data &&
          Array.isArray(action.payload.data)
        ) {
          state.favoriteBags = action.payload.data;
        } else if (
          action.payload &&
          action.payload.items &&
          Array.isArray(action.payload.items)
        ) {
          state.favoriteBags = action.payload.items;
        } else {
          console.log("Unexpected payload format, setting empty array");
          state.favoriteBags = [];
        }

        console.log("Favorite bags updated in state:", state.favoriteBags);
      })
      .addCase(fetchUserFavoriteBags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleBagFavorite.fulfilled, (state, action) => {
        const { bagId, isAdded } = action.payload;
        console.log(
          `Toggling bag favorite for bagId: ${bagId}, isAdded: ${isAdded}`
        );
        console.log("Response data:", action.payload.response);

        // Update favoriteBags array
        if (isAdded) {
          // Add to favorites if not already there
          const existingItem = state.favoriteBags.find(
            (item) => item.id === bagId || item.bagId === bagId
          );
          if (!existingItem) {
            // We would need to get the bag details from the bags slice
            // For now, we'll add a placeholder
            state.favoriteBags.push({
              id: bagId,
              bagId: bagId,
              isFav: true,
            });
          }
        } else {
          // Remove from favorites
          state.favoriteBags = state.favoriteBags.filter(
            (item) => item.id !== bagId && item.bagId !== bagId
          );
        }
      });
  },
});

export const { clearBagFavorites } = bagFavoritesSlice.actions;
export default bagFavoritesSlice.reducer;
