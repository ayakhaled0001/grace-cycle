import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// =================== Initial State =======================
const initialState = {
  msg: "",
  user: "",
  token: "",
  userType: "",
  isLoading: false,
  error: "",
};

// ===================== BaseUrl ============================

const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Signup =======================
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BaseUrl}api/WebUser/register-web`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// =================== Login =======================
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BaseUrl}api/WebUser/login`,
        userData
      );
      console.log("Login API Response: ", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// =================== AuthSlice =======================

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state) => {
      state.token = null;
      state.userType = "";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    //*****************Signup******************* */
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.msg = action.payload.message;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.error = null;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userType", action.payload.userType);
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.user = null;
    });
    //*****************Login******************* */
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.error = null;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userType", action.payload.userType);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.user = null;
    });
  },
});

export const { addToken, addUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
