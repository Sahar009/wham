import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';
import { toast } from 'react-toastify';

const initialState = {
enquiry:null,
enquiries:[],
isError:false,
isSuccess:false,
isLoading:false,
message:"",
// course:[]

};
//create new student 
export  const  createenquiryStudent = createAsyncThunk(
    "enquiry/createequiry",
    async(formData,thunkAPI) => {
        try {
            return await enquiryService.createEnquiry
            (formData)
        } catch (error) {
            const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(message)
        }
    }
)
const enquirySlice = createSlice({
    name: "student",
    initialState,
    reducers: {
      CALC_STORE_VALUE(state, action){
          const students = action.payload
          const array = []
          students.map((item) => {
              const {price } = item 
              const studentValue = price  * students.length
              return array.push(studentValue)
          })
          const totalValue = array.reduce((a,b) =>{
              return a+b
          },0)
          state.totalStoreValue = totalValue
      }}, extraReducers: (builder) => {
        builder
            .addCase(createenquiryStudent.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(createenquiryStudent.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload)
                state.enquiries.push(action.payload);
                toast.success('student added successfully')
            })
            .addCase(createenquiryStudent.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            });
    }});
export default enquirySlice.reducer