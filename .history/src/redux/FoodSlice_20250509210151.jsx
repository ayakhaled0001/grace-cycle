import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetching all food categories

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
