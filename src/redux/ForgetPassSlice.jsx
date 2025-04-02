import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== BaseUrl ============================
const BaseUrl = "https://gracecycleapi.azurewebsites.net/";

// =================== Initial State =======================
const initialState = {
  email: "",
  otp: "",
  token: "",
  message: "",
  isLoading: false,
  error: "",
};

// =================== Request 1: Send Email =======================
export const sendEmail = createAsyncThunk(
  "forgetPassword/sendEmail",
  async ({email}, thunkAPI) => {
    try {
      const response = await axios.post(`${BaseUrl}api/WebUser/forgot-password`, { email });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// =================== Request 2: Verify OTP =======================
export const verifyOTP = createAsyncThunk(
  "forgetPassword/verifyOTP",
  async ({ email, code }, thunkAPI) => {
    try {
      const response = await axios.post(`${BaseUrl}api/WebUser/verify-reset-code`, { email, code });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// =================== Request 3: Reset Password =======================
export const resetPassword = createAsyncThunk(
  "forgetPassword/resetPassword",
  async ({ email, token, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post(`${BaseUrl}api/WebUser/reset-password`, {
        email,
        token,
        newPassword,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// =================== ForgetPassword Slice =======================
export const ForgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    setEmailAction: (state, action) => {
      state.email = action.payload; // تحديث قيمة الإيميل
    },
    clearState: (state) => {
      state.email = "";
      state.otp = "";
      state.token = "";
      state.message = "";
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // ***************** Send Email *******************
    builder.addCase(sendEmail.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.email = action.meta.arg.email;
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // ***************** Verify OTP *******************
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token; // استلام التوكن
      state.message = action.payload.message;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // ***************** Reset Password *******************
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearState , setEmailAction} = ForgetPasswordSlice.actions;
export default ForgetPasswordSlice.reducer;
