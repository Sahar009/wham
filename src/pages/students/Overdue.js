import {useEffect} from 'react'
import StudentOverdue from '../../component/Student/studentlist/StudentOverdue'
import Card from '../../component/card/Card';
import useRedirectlogout from '../../component/customhook/useRedirectlogout';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/authSlice';
import { getStudents, selectIsLoading } from '../../redux/features/student/studentSlice';

import { selectStudent } from '../../redux/features/student/studentSlice';
const Students = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn)
  const studentState = useSelector((state) => state.student);
  
  const { students, isLoading, isError, message } = useSelector(
    (state) => state.student
  );

//   useEffect(() =>{
// if (isLoggedIn === true){
// dispatch(getStudents())
// // console.loge)(students)
// // isLoading(false)

// if(isError){
//   console.log(message)
// }
// }

//   },[isLoggedIn,dispatch,message,isError,students])
  return (
    <div>Owing Student
         <StudentOverdue  students={students} isLoading={isLoading}/>
    </div>
  )
}

export default Students