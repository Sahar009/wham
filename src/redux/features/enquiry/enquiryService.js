import axios from 'axios'
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_BACKEND_URL;
// const API_URL = `${BACKEND_URL}/api/students`
const API_URL = `http://localhost:5000/api/enquiry/`


//create enquired  student 
const createEnquiry = async (formData) =>{
    const response = await axios.post(`http://localhost:5000/api/enquiry`, formData)
    return response.data
}




const enquiryService = {
    createEnquiry
}
export  default enquiryService