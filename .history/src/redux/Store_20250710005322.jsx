import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ForgetPasswordSlice from "./ForgetPassSlice";
import bagsReducer from "./BagsSlice";
import foodReducer from "./FoodSlice";
import foodFilterReducer from "./FoodFilterSlice";
import categoriesReducer from "./CategoriesSlice";
import vendorFilterReducer from "./VendorFilterSlice";
import vendorCategoriesReducer from "./VendorCategoriesSlice";
import vendorReducer from "./VendorSlice";
import vendorDetailsReducer from "./VendorDetailsSlice";
import foodListingReducer from "./FoodListingSlice";
import bagDetailsReducer from "./BagDetailsSlice";
import bagFavoritesReducer from "./BagFavoritesSlice";

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
    vendors: vendorReducer,
    vendorDetails: vendorDetailsReducer,
    foodListing: foodListingReducer,
    bagDetails: bagDetailsReducer,
    bagFavorites: bagFavoritesReducer,
  },
});
