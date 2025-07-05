import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ForgetPasswordSlice from "./ForgetPassSlice";
import bagsReducer from "./BagsSlice";
import foodReducer from "./FoodSlice";
<<<<<<< HEAD
import foodFilterReducer from "./FoodFilterSlice";
import categoriesReducer from "./CategoriesSlice";
import vendorFilterReducer from "./VendorFilterSlice";
import vendorCategoriesReducer from "./VendorCategoriesSlice";
=======
import vendorReducer from "./VendorSlice";
import vendorDetailsReducer from "./VendorDetailsSlice";
import foodListingReducer from "./FoodListingSlice";
>>>>>>> vendordet

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    forgetPassword: ForgetPasswordSlice,
    bags: bagsReducer,
    servicesFood: foodReducer,
<<<<<<< HEAD
    foodFilter: foodFilterReducer,
    categories: categoriesReducer,
    vendorFilter: vendorFilterReducer,
    vendorCategories: vendorCategoriesReducer,
=======
    vendors: vendorReducer,
    vendorDetails: vendorDetailsReducer,
    foodListing: foodListingReducer,
>>>>>>> vendordet
  },
});
