import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ForgetPasswordSlice from "./ForgetPassSlice";
import bagsReducer from "./BagsSlice";
import foodReducer from "./FoodSlice";
import foodFilterReducer from "./FoodFilterSlice";
import categoriesReducer from "./CategoriesSlice";
import vendorFilterReducer from "./VendorFilterSlice";
import vendorCategoriesReducer from "./VendorCategoriesSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    forgetPassword: ForgetPasswordSlice,
    bags: bagsReducer,
    servicesFood: foodReducer,
    foodFilter: foodFilterReducer,
    categories: categoriesReducer,
    vendorFilter: vendorFilterReducer,
    vendorCategories: vendorCategoriesReducer,
  },
});
