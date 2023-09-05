import React from 'react';
import './enquiryForm.scss'
import Card from '../../card/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StudentForm = ({
  enquiry,
  
    imagePreview, 
    description, 
    setDescription,
    handleInputChange,
    handleImageChange,
    saveEnquiry

}) => {
  return (
    <div className="add-student">
        <Card cardClass={"card"}>
        <form onSubmit={saveEnquiry}>
        <Card cardClass={"group"}>
            <label>Student Name:</label>
          <input
            type="text"
            placeholder="Student  name"
            name="name"
            value={enquiry?.name} 
            // optional chaining
            onChange={handleInputChange}
          />

          <label>Course:</label> 
          {/* Student Category */}
          <input
            type="text"
            placeholder="course"
            name="course"
            value={enquiry?.course}
            onChange={handleInputChange}
         
          />

          <label>Gender:</label>
          <div style={{display:'flex',gap:'1rem', marginBottom:'2rem'}}>
          <label>male:</label>
          <input
            type="radio"
            name="Gender"
          />
          <label>female:</label>
          <input
            type="radio"
            name="Gender"
          />
          </div>
          <label>Phone number:</label>
          <input
            type="number"
            placeholder=" +234 Phone number"
            name="phone"
            value={enquiry?.phone}
            onChange={handleInputChange}
            
          />
          <label>email:</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={enquiry?.email}
            onChange={handleInputChange}
            
          />
          {/* <label>Course(s):</label>
          <select 
           value={student?.course}
           onChange={handleInputChange}>
            <option>--AutoCad--</option>
            <option>--C C# C++ --</option>
            <option>--Python Programming--</option>
            <option>--Java Programming--</option>
            <option>--Data Analysis--</option>
            <option>--Graphic Design--</option>
            <option>--Degital marketing--</option>
            <option>--Web Development--</option>
            <option>--Other--</option>

          </select> */}
         
          {/* <label>Price:</label>
          <input
            type='number'
            placeholder="price"
            name="text"
            value={student?.price}
            onChange={handleInputChange}
            
            
          /> */}
         

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
              Save enquired Student
            </button>
          </div>

        </form>
        </Card>
    </div>
  )
};
StudentForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
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

export default StudentForm