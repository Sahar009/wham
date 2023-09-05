import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/features/authSlice'
import studentReducer from '../redux/features/student/studentSlice'
import filterReducer from "../redux/features/student/filterSlice"
import enquiryReducer from "../redux/features/enquiry/enquirySlice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        student :studentReducer,
        filter:filterReducer,
        enquiry:enquiryReducer
    }
})

