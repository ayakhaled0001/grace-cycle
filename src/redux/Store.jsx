import {configureStore} from '@reduxjs/toolkit'
import  AuthSlice  from './AuthSlice'
import  ForgetPasswordSlice  from './ForgetPassSlice'

export const store = configureStore({
    reducer:{
        auth : AuthSlice,
        forgetPassword : ForgetPasswordSlice,
    }
})