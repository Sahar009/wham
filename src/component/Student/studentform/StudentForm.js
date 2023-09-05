// StudentForm.js
import React, { useState, useEffect } from "react";
import "./studentForm.scss";
import Card from "../../card/Card.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StudentForm = ({
  student,
  studentImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  handleCourseChange,
  saveStudent,
  courseOptions, // Updated the prop name to 'courseOptions'
  selectedCourse, // Updated the prop name to 'selectedCourse'
}) => {
  // Function to get the price for the selected course
  const getPriceForCourse = (course) => {
    const selectedOption = courseOptions.find((option) => option.course === course);
    return selectedOption ? selectedOption.price : "";
  };

  return (
    <div className="add-student">
      <Card cardClass={"card"}>
        <form onSubmit={saveStudent}>
          <Card cardClass={"group"}>
            <label>Student Image</label>
            <code className="--color-dark">Supported Formats: jpg, jpeg, png</code>
            <input type="file" name="image" onChange={(e) => handleImageChange(e)} />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="student" />
              </div>
            ) : (
              <p>No image set for this student.</p>
            )}

            <label>Student Name:</label>
            <input
              type="text"
              placeholder="Student name"
              name="name"
              value={student?.name}
              onChange={handleInputChange}
            />

            <label>Course:</label>
            <select name="course" value={selectedCourse} onChange={handleCourseChange}>
              {courseOptions.map((option) => (
                <option key={option.course} value={option.course}>
                  {option.course}
                </option>
              ))}
            </select>

            <label>Phone number:</label>
            <input
              type="number"
              placeholder="+234 Phone number"
              name="phone"
              value={student?.phone}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={student?.email}
              onChange={handleInputChange}
            />

            <label>Amount paid:</label>
            <input
              type="number"
              placeholder="Amount paid"
              name="paid"
              value={student?.paid}
              onChange={handleInputChange}
            />

            <label>Price:</label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={getPriceForCourse(selectedCourse)} // Display the price for the selected course
              disabled // Disable the input field to make it non-editable
            />

            <label>Start Date:</label>
            <input type="date" />

            <label>Student Description:</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={StudentForm.modules}
              formats={StudentForm.formats}
            />
          </Card>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Student
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

StudentForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ],
};
StudentForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default StudentForm;
