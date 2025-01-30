import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "https://ecommerce.routemisr.com";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userCredential) => {
    const res = await axios.post(
      `${BaseUrl}/api/v1/auth/signin`,
      userCredential
    );
    const data = await res.data;
    localStorage.setItem("userlogin", JSON.stringify(data));
    return data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userCredential) => {
    const res = await axios.post(
      `${BaseUrl}/api/v1/auth/signup`,
      userCredential
    );
    const data = await res.data;
    localStorage.setItem("userSignup", JSON.stringify(data));
    return data;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    msg: "",
    user: "",
    token: "",
    isLoading: false,
    error: "",
  },
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state) => {
      state.token = null;
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
      state.user = action.payload;
      state.error = null;
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
      state.msg = action.payload.msg; // تأخذ الرسالة من payload
      state.token = action.payload.token; // تأخذ التوكن من payload
      state.user = action.payload.user; // تأخذ المستخدم من payload

      localStorage.setItem("msg", action.payload.msg);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      state.error = null;
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