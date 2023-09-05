import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredStudents :[]
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_STUDENTS(state, action){
const {students, search} = action.payload
const tempStudents = students.filter((student) => 
student.name.toLowerCase().includes(search.toLowerCase()) || 
student.course.toLowerCase().includes(search.toLowerCase()) )

state.filteredStudents = tempStudents
    }
  }
});

export const {FILTER_STUDENTS} = filterSlice.actions
export const selectFilteredStudents = (state) => state.filter.filteredStudents;

export default filterSlice.reducer