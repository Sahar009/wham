// AddStudent.js
import React, { useState } from "react";
import StudentForm from "../../component/Student/studentform/StudentForm";
import { useSelector } from "react-redux";
import { selectIsLoading, createStudent } from "../../redux/features/student/studentSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../component/loader/Loader";
import courseOptions from "../editStudent/courseOptions"; // Import the courseOptions data

const initialState = {
  name: "",
  course: "",
  price: "",
  paid: "",
  email: "",
  phone: "",
};

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [student, setStudent] = useState(initialState);
  const [studentImage, setStudentImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); // New state variable

  const isLoading = useSelector(selectIsLoading);
  const { name, course, paid, phone, email } = student;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleImageChange = (e) => {
    setStudentImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateID = (course) => {
    const letter = course.slice(0, 2).toUpperCase();
    const number = Date.now();
    const ID = letter + "-" + number;
    return ID;
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setStudent({ ...student, course: selectedCourse });
    setSelectedCourse(selectedCourse); // Update the selectedCourse state with the new selected course
  };

  const saveStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("ID", generateID(course));
    formData.append("course", course);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("paid", paid);
    formData.append("price", getPriceForCourse(selectedCourse)); // Use the function to get the price for the selected course

    formData.append("description", description);
    formData.append("image", studentImage);

    await dispatch(createStudent(formData));
    console.log("Form Data:", formData);
    navigate("/dashboard");
  };

  // Function to get the price for the selected course
  const getPriceForCourse = (course) => {
    const selectedOption = courseOptions.find((option) => option.course === course);
    return selectedOption ? selectedOption.price : "";
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Student</h3>
      <StudentForm
        student={student}
        studentImage={studentImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleCourseChange={handleCourseChange}
        saveStudent={saveStudent}
        courseOptions={courseOptions}
        selectedCourse={selectedCourse} // Pass the selectedCourse to the form
      />
    </div>
  );
};

export default AddStudent;
