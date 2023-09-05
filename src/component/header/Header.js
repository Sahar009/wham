import React from 'react'
import { logoutUser } from '../../service/authService';
import { SET_LOGIN, selectName } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const dispatch = useDispatch()
const Navigate = useNavigate()
const name = useSelector(selectName)
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    Navigate("/");
  };
  
  return (
    <div className="--pad header">
    <div className="--flex-between">
      <h3>
        <span className="--fw-thin">Welcome, </span>
        <span className="--color-danger">{name}</span>
      </h3>
      <button className="--btn --btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
    <hr />
  </div>
  )
}

export default Header