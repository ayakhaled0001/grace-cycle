import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ForgetPasswordSlice from "./ForgetPassSlice";
import bagsReducer from "./BagsSlice";
import foodReducer from "./FoodSlice";
import vendorReducer from "./VendorSlice";
import vendorDetailsReducer from "./VendorDetailsSlice";
import foodListingReducer from "./FoodListingSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    forgetPassword: ForgetPasswordSlice,
    bags: bagsReducer,
    servicesFood: foodReducer,
    vendors: vendorReducer,
    vendorDetails: vendorDetailsReducer,
    foodListing: foodListingReducer,
  },
});
