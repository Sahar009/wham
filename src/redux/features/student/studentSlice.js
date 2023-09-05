
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentService from './studentService';
import { toast } from 'react-toastify';

const initialState = {
student:null,
students:[],
isError:false,
isSuccess:false,
isLoading:false,
message:"",
totalStoreValue:0,
course:[]

};
//create new student 
export  const  createStudent = createAsyncThunk(
    "students/create",
    async (formData,thunkAPI) => {
        try {
            return await studentService.createStudent(formData)
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
//get all students
export  const  getStudents = createAsyncThunk(
    "students/getAll",
    async(_,thunkAPI) => {
        try {
            return await studentService.getStudents()
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
//delete a student

export  const  deleteStudent = createAsyncThunk(
    "students/delete",
    async(id,thunkAPI) => {
        try {
            return await studentService.deleteStudent(id)
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

// update student 


export  const  updateStudent = createAsyncThunk(
    "students/updateStudent",
    async({id,formData},thunkAPI) => {
        try {
            return await studentService.updateStudent(id, formData)
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

//get a student

export  const  getStudent = createAsyncThunk(
    "students/getStudent",
    async(id,thunkAPI) => {
        try {
            return await studentService.getStudent(id)
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

const studentSlice = createSlice({
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
    },
    CALC_OWING(state,action){
        const students = action.payload
        const array = []
        students.map((item) => {
            const {price,mainprice } = item 
             
            const owedamount = mainprice - price 
            
            
            return array.push(owedamount)
        });
        // let count = 0;
        // array.forEach((number) =>{
        //     if (number < mainprice){
        //         count +=1
        //     }
           
        // })
        // state.owedamount =count
    },
    CALC_COURSE(state, action) {
        const students = action.payload
        const array = []
        students.map((item) => {
            const {course } = item 
           
            return array.push(course)
        });
        const uniqueCourse = [...new Set(array)]
        state.course = uniqueCourse;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(createStudent.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(createStudent.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.students.push(action.payload);
            toast.success('student added successfully')
        })
        .addCase(createStudent.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
        })
        .addCase(getStudents.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getStudents.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.students= action.payload;
           
        })
        .addCase(getStudents.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
        })
        .addCase(deleteStudent.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(deleteStudent.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
           toast.success('Student deleted successfuly')
           
        })
        .addCase(deleteStudent.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
        })
        //updtate student cases
        .addCase(updateStudent.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(updateStudent.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
           toast.success('Student updated successfuly')
           
        })
        .addCase(updateStudent.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
        })

        //get a studnt casse

        .addCase(getStudent.pending, (state) =>{
            // state.isLoading = true
        })
        .addCase(getStudent.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.student = action.payload
        })
        .addCase(getStudent.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
        });
  },
  }
);

export const {CALC_STORE_VALUE,CALC_COURSE,CALC_OWING} = studentSlice.actions
export const selectIsLoading = (state) => state.student.isLoading;
export const selectStudent = (state) => state.student.student;
export const selectTotalStoreValue = (state) => state.student.totalStoreValue;
export const selectOwedAmount = (state) => state.student.owedamount;
export const selectCourse = (state) => state.student.course;

export default studentSlice.reducer