import React from 'react'
import EnquiryForm from '../../component/enquiry/enquiryform/EnquiryForm'
import EnquiryList from '../../component/enquiry/enquirylist/EnquiryList'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoading,createStudent } from '../../redux/features/student/studentSlice'
import { createenquiryStudent } from '../../redux/features/enquiry/enquirySlice'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from '../../component/loader/Loader'

const initialState ={
  name: '',
  // course:'',
  // paid:'',
  email:'',
  // phone:''
}

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(initialState)
  const [studentImage, setStudentImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')

  const isLoading = useSelector(selectIsLoading)
  const {name, course, paid,phone,email} = enquiry

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiry({ ...enquiry, [name]: value });
  };

  const handleImageChange = (e) => {
  setStudentImage(e.target.files[0])
  setImagePreview(URL.createObjectURL(e.target.files[0]))
  };
  const generateID = (course) =>{
    const letter = course.slice(0,2).toUpperCase()
    const number = Date.now()
    const ID = letter + "-" + number 
    return ID;

  }

  const saveEnquiry = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    // formData.append('ID', generateID(course))
    // formData.append('course', course)
    formData.append('email', email)
    // formData.append('phone', phone)
    // formData.append('paid', paid)
   
    // formData.append('description', description)
    // formData.append('image', studentImage)

    console.log(...formData)
    


    await dispatch(createenquiryStudent(formData))
    // navigate('/dashboard')
    
  }
  return (
    <div className='--grid-15'>
      {/* {isLoading && <Loader/>} */}
         
         <EnquiryForm
         
         enquiry = {enquiry}
         description = {description}
         setDescription = {setDescription}
         handleInputChange = {handleInputChange}
         handleImageChange = {handleImageChange }
         saveEnquiry = {saveEnquiry}
         />
         <EnquiryList/>
    </div>
  )
}

export default AddStudent
