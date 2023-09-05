import {useEffect,useState, useRef} from 'react';
import * as V from 'victory';
import { VictoryLabel, VictoryPie } from 'victory';
import './dashboard.scss'
import Card from '../../component/card/Card';
import useRedirectlogout from '../../component/customhook/useRedirectlogout';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/authSlice';
import { getStudents, selectIsLoading } from '../../redux/features/student/studentSlice';
import StudentList from '../../component/Student/studentlist/StudentList';
import { selectStudent } from '../../redux/features/student/studentSlice';
import StudentSummary from '../../component/Student/studentSummary/StudentSummary';
import PieChart from './Piechart';




const Dashboard = () => {
 
  useRedirectlogout('/login');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const studentState = useSelector((state) => state.student);
  const [chartId, setChartId] = useState(0);
  const { students, isLoading, isError, message } = useSelector(
    (state) => state.student
  );

  useEffect(() =>{
if (isLoggedIn === true){
dispatch(getStudents())
// console.loge)(students)
// isLoading(false)

if(isError){
  console.log(message)
}
}

  },[isLoggedIn,dispatch,message,isError,students])


  // const send = (e) =>{
    // hbcode 
  //   e.preventDefault();
  //   emailjs.sendForm
  // }
  const calculateTotalBalance = () => {
    let totalBalance = 0;
    for (const student of students) {
      const { price, paid } = student;
      totalBalance += price - paid;
    }
    return totalBalance;
  };

  //calc total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const student of students) {
      totalPrice += parseInt(student.price, 10);
    }
    return totalPrice;
  };

   //calc total paid 
   const calculateTotalPaid = () => {
    let totalPaid = 0;
    for (const student of students) {
      totalPaid += parseInt(student.paid, 10);
    }
    return totalPaid;
  };
  const calculateStudentCountByCourse = () => {
    const studentCountByCourse = {};
    for (const student of students) {
      const { course } = student;
      if (studentCountByCourse[course]) {
        studentCountByCourse[course] += 1;
      } else {
        studentCountByCourse[course] = 1;
      }
    }
    return studentCountByCourse;
  };

  const studentCountByCourse = calculateStudentCountByCourse();

  
  return (
    <div >
      <h1>Dashboard</h1>
      <Card >
        <div className='--flex-between --flex-center'>
      <StudentSummary students={students} totalBalance={calculateTotalBalance()} totalPaid ={calculateTotalPrice()} totalprice ={calculateTotalPaid()}/>
  
      </div>
      
      </Card>
      <div className='--flex-start '>
      <div className='--flex-between --flex-center'>
      <Card>
        <PieChart
        chartId={chartId}
        totalPaid={calculateTotalPaid()}
        totalPrice={calculateTotalPrice()}
      />
      </Card>
      </div>
      
      <Card>
      <div className='--flex-between --flex-center'>
        
        <VictoryPie
        width={500} 
        height={500} 
          data={Object.keys(studentCountByCourse).map((course) => ({
            x: course,
            y: studentCountByCourse[course],
            label: `${course}: ${studentCountByCourse[course]}`, // Display label with course and count
          }))}
          labels={({ datum }) => datum.label} // Display labels using the 'label' property of the data points
          innerRadius={40}
    padAngle={3}
    padding={100}
        />
        <VictoryLabel 
          textAnchor="middle"
          verticalAnchor="middle"
          
          animate={{
            duration: 1000
          }}
          text={`Total: ${students.length}`}
          style={{ fontSize: 10 }}
        />
        </div>
      </Card>
      
     {/* <StudentList students={students} isLoading={isLoading}/> */}
     </div>
    </div>
  )
}

export default Dashboard