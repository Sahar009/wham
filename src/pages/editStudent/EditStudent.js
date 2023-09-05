import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getStudent, getStudents, selectIsLoading, selectStudent, updateStudent } from '../../redux/features/student/studentSlice';
import { useEffect } from 'react';
import Loader from '../../component/loader/Loader';
import StudentForm from '../../component/Student/studentform/StudentForm';
import courseOptions from './courseOptions';
const EditStudent = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
  const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading)
    const StudentEdit = useSelector(selectStudent)

    const [student, setStudent] = useState(StudentEdit || {});

  const [studentImage, setStudentImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')



    
  useEffect(() => {
    dispatch(getStudent(id));
  }, [dispatch, id]);

  useEffect(() => {
    setStudent(StudentEdit || {});
    setImagePreview(
      StudentEdit && StudentEdit.image ? `${StudentEdit.image.filePath}` : null
    );
    setDescription(
      StudentEdit && StudentEdit.description ? StudentEdit.description : ''
    );
  }, [StudentEdit]);








useEffect(() => {
  dispatch(getStudent(id));
}, [dispatch, id]);

useEffect(() => {
  setStudent(StudentEdit || {});
  setImagePreview(
    StudentEdit && StudentEdit.image ? `${StudentEdit.image.filePath}` : null
  );
  setDescription(
    StudentEdit && StudentEdit.description ? StudentEdit.description : ''
  );
}, [StudentEdit]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setStudent({ ...student, [name]: value });
    };
  
    const handleImageChange = (e) => {
    setStudentImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
    };

    //save student
    const saveStudent = async (e) =>{
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', student?.name)
      formData.append('course', student?.course)
      formData.append('price', student?.price)
      formData.append('paid', student?.paid)
      formData.append('phone', student?.phone)
      formData.append('description', description)
      if(studentImage){
        formData.append('image', studentImage)
      }
      
  
      console.log(...formData)
  
  
      await dispatch(updateStudent({id, formData}))
      await dispatch(getStudents())
      navigate('/dashboard')
      
    }

  return (
    <div>
      {isLoading && <Loader/>}
         <h3 className="--mt">Edit Student</h3>
         <StudentForm
         
         student = {student}
         studentImage = {studentImage}
         imagePreview = {imagePreview}
         description = {description}
         setDescription = {setDescription}
         handleInputChange = {handleInputChange}
         handleImageChange = {handleImageChange }
         saveStudent = {saveStudent}
        
         courseOptions={courseOptions} // Pass the courseOptions as a prop
         selectedCourse={student.course} // Pass the selected course as a prop
     
         />
    </div>
  )
}

export default EditStudent