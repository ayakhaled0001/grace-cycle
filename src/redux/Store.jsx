import {configureStore} from '@reduxjs/toolkit'
// import  productSlice  from './ProductSlice'
// import  BrandSlice  from './BrandSlice'
// import  CategorySlice from './CategoriesSlice'
import  AuthSlice  from './AuthSlice'

export const store = configureStore({
    reducer:{
        // products : productSlice,
        // Brands : BrandSlice,
        // Categories : CategorySlice,
        auth : AuthSlice,
    }
})