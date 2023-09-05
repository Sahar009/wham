import { FaTh, FaRegChartBar, FaCommentAlt,FaUserGraduate,FaUsers}  from "react-icons/fa";
import { RiFileChartLine } from "react-icons/ri";

import { MdOutlineGroupAdd} from "react-icons/md";
import { AiOutlineForm} from "react-icons/ai";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  // {
  //   title: "Enquiry",
  //   icon: <AiOutlineForm />,
  //   path: "/enquiry",
  // },
  {
    title: "Add Student",
    icon: <MdOutlineGroupAdd/>,
    path: "/add-student",
  },
  // {
  //   title: "Classes",
  //   icon: <FaUserGraduate />,
  //   path: "/classes",
  // },
  {
    title: "Students",
    icon: <FaUsers color="orangered"/>,
    path: "/Students",
  },
  // {
  //   title: "Attendance",
  //   icon: <RiFileChartLine/>,
  //   path: "/attendance",
  // },
  // {
  //   title: "Account",
  //   icon: <FaRegChartBar />,
  //   path: "/account",
  // },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;