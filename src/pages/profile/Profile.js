import React, { useEffect, useState } from 'react'
import './profile.scss'
import Card from '../../component/card/Card'
import { Link } from 'react-router-dom'
import useRedirectlogout from '../../component/customhook/useRedirectlogout'
import { useDispatch } from 'react-redux'
import { getUser } from '../../service/authService'
import { SAVE_USER, SET_NAME } from '../../redux/features/authSlice'
import { SpinnerImg } from '../../component/loader/Loader'
const Profile = () => {
useRedirectlogout('/login')
const dispatch = useDispatch()
const [profile, setProfile] = useState(null)
const [isLoading, setIsLoading] = useState(false)

useEffect(() =>{
setIsLoading(true)
async function getUserData(){
  const data = await getUser()
  console.log(data)

  setProfile(data)
setIsLoading(false)
await  dispatch(SAVE_USER(data))
await  dispatch(SET_NAME(data.name))
}
getUserData()
},[dispatch])
   
  return (
    <div className='profile --my2'>
      {isLoading && <SpinnerImg/>}
      <>
      {!isLoading && profile === null ? (
        <p>something went wrong, reload page ...</p>
      ):(

        <Card cardClass={'card --flex-dir-column'}>
<span className='profile-photo'>
    <img src={profile?.photo} alt='profile picture'/>
</span>
<span className="profile-data">
              <p>
                <b>Name :{profile?.name} </b> 
                {/* {profile?.name} */}
              </p>
              <p>
                <b>Email : {profile?.email} </b> 
                {/* {profile?.email} */}
              </p>
              <p>
                <b>Phone : {profile?.phone}</b> 
                {/* {profile?.phone} */}
              </p>
              <p>
                <b>Bio : {profile?.bio}</b>
                {/* {profile?.bio} */}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
</Card>
      )}</>
        

    </div>
  )
}

export default Profile