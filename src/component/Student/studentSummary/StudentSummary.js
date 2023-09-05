import "./studentsummary.scss";
import { TbCurrencyNaira} from "react-icons/tb";
import Infobox from "../../infobox/Infobox";
import { FaRegistered } from "react-icons/fa";
import { AiTwotoneHourglass } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CALC_COURSE, CALC_STORE_VALUE, CALC_OWING, selectCourse, selectTotalStoreValue,selectOwedAmount } from "../../../redux/features/student/studentSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const StudentSummary = ({students,totalBalance, totalPaid,totalprice}) => {

  const dispatch = useDispatch()
  const totalStoreValue = useSelector(selectTotalStoreValue)
  const courses = useSelector(selectCourse)
  const owedamount =useSelector(selectOwedAmount)
  useEffect(() =>{
dispatch(CALC_STORE_VALUE(students));
dispatch(CALC_COURSE(students))
dispatch(CALC_OWING(students))
  },[dispatch,students])
  // Icons
const earningIcon = <TbCurrencyNaira size={40} color="#fff" />;
const studentIcon = <TbCurrencyNaira size={40} color="#fff" />;
const RegisterIcon = <FaRegistered size={40} color="#fff" />;
const PendingIcon = <AiTwotoneHourglass size={40} color="#fff" />;

  return (
    <div className="student-summary">
      <h3 className="--mt">Inventory Statistics</h3>
      <div className="info-summary">
        <Link><Infobox icon={earningIcon} text={'Total Income'} count={`₦${formatNumbers(totalPaid)}`}  bgColor="card2"/></Link>
       <Link to='/overdue'><Infobox icon={studentIcon} text={'Amount Overdue' } count={`₦${formatNumbers(totalBalance)}`} bgColor="card3"/></Link>
        <Link><Infobox icon={PendingIcon} text={'amount paid' } count={`₦${formatNumbers(totalprice)}`} bgColor="card1"/></Link>
        <Link to='/students'><Infobox icon={RegisterIcon} text={'Reg student' } count={students.length} bgColor="card4"/></Link>
        <Link><Infobox icon={RegisterIcon} text={'Courses reg' } count={courses.length} bgColor="card5"/></Link>
       
        </div>
        </div>
  )
}

export default StudentSummary