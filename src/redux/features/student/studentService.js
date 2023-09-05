import axios from 'axios'
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_BACKEND_URL;
// const API_URL = `${BACKEND_URL}/api/students`
const API_URL = `https://parachbackend.onrender.com/api/students`
//https://parachbackend.onrender.com



//create student 
 const createStudent = async (formData) =>{
    const response = await axios.post(API_URL, formData)
     return response.data;
}
//get all students student 
const getStudents = async () =>{
    const response = await axios.get(API_URL)
    return response.data
}

//deleate Student 
const deleteStudent = async (id) =>{
    const response = await axios.delete(API_URL + id)
    return response.data
}

// update student
const updateStudent = async (id, formData) =>{
    //`${API_URL}${id}`
    const response = await axios.patch(API_URL + id
    , formData)
    return response.data
}
const getStudent = async (id) =>{
    const response = await axios.get(API_URL + id
)
    return response.data
}




const studentService = {
    createStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    getStudent
}
export  default studentService