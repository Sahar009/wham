import {useState} from 'react'
// import Loader from '../../component/loader/Loader'
import styles from "./Auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from '../../component/card/Card';
import { RegisterUser, validateEmail } from "../../service/authService";
import {useDispatch} from 'react-redux';
import Loader from '../../component/loader/Loader'
import {Link, useNavigate} from 'react-router-dom'
import { SET_LOGIN, SET_NAME } from "../../redux/features/authSlice";
import { toast } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialState = {
      name:"",
      email:"",
      password:"",
      password2:"",
    }
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const {name,email,password, password2} = formData

    const handleInputChange = (e) =>{
      const {name, value} = e.target;
      setFormData({...formData, [name] : value});
    }
    const register = async(e) =>{
      e.preventDefault();

      if (!name || !email || !password) {
        return toast.error("All fields are required");
      }
      if (password.length < 6) {
        return toast.error("Passwords must be up to 6 characters");
      }
      if (!validateEmail(email)) {
        return toast.error("Please enter a valid email");
      }
      if (password !== password2) {
        return toast.error("Passwords do not match");
      }
       const userData = {
         name:name,
         email :email,
         password:password
       }
       setIsLoading(true)
       try {
         const data = await RegisterUser(userData)
         console.log(data)
        //  await dispatch(SET_LOGIN(true))
        //  await dispatch(SET_NAME(data.name))
         navigate('/dashboard')
         setIsLoading(false)
       } catch (error) {
         setIsLoading(false)
         console.log(error)
       }
       }

  return (
    <div className={`container ${styles.auth}`}>
    {isLoading && <Loader />}
    <Card>
      <div className={styles.form}>
        <div className="--flex-center">
          <TiUserAddOutline size={35} color="#3060ff" />
        </div>
        <h2>Register</h2>

        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange = {handleInputChange}
           
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange = {handleInputChange}
            
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange = {handleInputChange}
           
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            name="password2"
            value={password2}
            onChange = {handleInputChange}
            
          />
          <button type="submit" className="--btn --btn-primary --btn-block">
            Register
          </button>
        </form>

        <span className={styles.register}>
          <Link to="/">Home</Link>
          <p> &nbsp; Already have an account? &nbsp;</p>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </Card>
  </div>
  )
}

export default Register