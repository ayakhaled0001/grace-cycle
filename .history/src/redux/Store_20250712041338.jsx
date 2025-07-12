import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ForgetPasswordSlice from "./ForgetPassSlice";
import bagsReducer from "./BagsSlice";
import addBagsReducer from "./AddBagsSlice";
import vendorBagListingReducer from "./VendorBagListingSlice";
import foodReducer from "./FoodSlice";
import foodFilterReducer from "./FoodFilterSlice";
import categoriesReducer from "./CategoriesSlice";
import vendorFilterReducer from "./VendorFilterSlice";
import vendorCategoriesReducer from "./VendorCategoriesSlice";
import vendorReducer from "./VendorSlice";
import vendorDetailsReducer from "./VendorDetailsSlice";
import foodListingReducer from "./FoodListingSlice";
import bagDetailsReducer from "./BagDetailsSlice";
import vendorSettingsReducer from "./VendorSettingsSlice";
import vendorListingReducer from "./VendorListingSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    forgetPassword: ForgetPasswordSlice,
    bags: bagsReducer,
    addBag: addBagsReducer,
    servicesFood: foodReducer,
    foodFilter: foodFilterReducer,
    categories: categoriesReducer,
    vendorFilter: vendorFilterReducer,
    vendorCategories: vendorCategoriesReducer,
    vendors: vendorReducer,
    vendorDetails: vendorDetailsReducer,
    foodListing: foodListingReducer,
    bagDetails: bagDetailsReducer,
    vendorSettings: vendorSettingsReducer,
    vendorListing: vendorListingReducer,
  },
});
