import React from 'react'
import useRedirectlogout from '../../customhook/useRedirectlogout'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/authSlice';
import { useEffect } from 'react';
import { getStudent } from '../../../redux/features/student/studentSlice';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import DOMPurify from 'dompurify';


const StudentDetail = () => {
    useRedirectlogout('/login');
    const dispatch = useDispatch()
    const {id} = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const studentState = useSelector((state) => state.student);
    
    const { student, isLoading, isError, message } = useSelector(
      (state) => state.student
    );
  
    useEffect(() =>{
  if (isLoggedIn === true){
  dispatch(getStudent(id))
  console.log(student)
  if(isError){
    console.log(message)
  }
  }
  
    },[isLoggedIn,dispatch,message,isError,student])

  return (
    <div className="product-detail">
    <h3 className="--mt">Student Detail</h3>
    <Card cardClass="card">
    {isLoading && <Loader/>}
        {student && (
          <div className="detail">
            <Card cardClass="group">
                {student ?.image ? (
                    <img src={student.image.filePath} alt={student.image.fileName}/>
                ):(
                    <p>No image set for this student </p>
                )}
                </Card>
                <h4>Student Profile</h4>
                <hr/>
                <h4>
                    <span className='badge'> Name: </span> &nbsp; {student.name}
                </h4>
                <p>
              <b>&rarr; ID : </b> {student._id}
            </p>
            <p>
              <b>&rarr; Course(s) : </b> {student.course}
            </p>
            <p>
              <b>&rarr; Phone no : </b> {student.phone}
            </p>
            <p>
              <b>&rarr; Email : </b> {student.email}
            </p>
            <p>
              <b>&rarr; Price : </b> {"₦"}
              {student.price}
            </p>
            <p>
              <b>&rarr; paid: </b> {"₦"}
              {student.price - student.paid}
            </p>
            <p>
              <b>&rarr; Amount due : </b> {"₦"}
              {student.price}
            </p>
            <p>
              <b>&rarr;Date Reg : </b>
              {student.createdAt}
            </p>
            
            <hr/>
            <div dangerouslySetInnerHTML={{
                __html:DOMPurify.sanitize(student.description)
            }}></div>

                <hr/>
                <code className='--color-dark'> created on {student.createdAt.toLocaleString("en-us")}</code>
                <br/>
                <code className='--color-dark'> Last Updated {student.updatedAt.toLocaleString("en-us")}</code>

            
                </div>
        
  )
  
}
</Card></div>
  )}
export default StudentDetail