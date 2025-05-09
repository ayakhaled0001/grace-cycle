import {configureStore} from '@reduxjs/toolkit'
import  AuthSlice  from './AuthSlice'
import  ForgetPasswordSlice  from './ForgetPassSlice'
import bagsReducer from "./BagsSlice";

export const store = configureStore({
    reducer:{
        auth : AuthSlice,
        forgetPassword : ForgetPasswordSlice,
        bags: bagsReducer,
        servicesFood : 
    }
})