import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoginStatus } from '../../service/authService'
import { SET_LOGIN } from '../../redux/features/authSlice'
import { toast } from 'react-toastify'

const useRedirectlogout = (path) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

  useEffect(() => {
    const redirectlogout = async () =>{
        const isLoggedIn = await getLoginStatus()
        dispatch(SET_LOGIN(isLoggedIn))

        if (!isLoggedIn){
            toast.info('session expired, please log in to continue')
            navigate(path)
            return
        }
;
redirectlogout()
    }
  
  }, [navigate, path,dispatch])
  
}

export default useRedirectlogout