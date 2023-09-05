import { createSlice } from '@reduxjs/toolkit'

// const name = JSON.parse(localStorage.getItem("name"));
const storedValue = localStorage.getItem("name");
let name;

try {
  name = JSON.parse(storedValue);
} catch (error) {
  // Handle the error or set a default value for `name`
  console.error("Error parsing JSON:", error);
  name = null; // or any other default value
}


const initialState = {
isLoggedIn: false ,
 name: name ? name : '',
user:{
  name:'',
  email:'',
  phone:'',
 bio:'',
  photo:'',
},
userID :""
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action){
      state.isLoggedIn = action.payload
    },
    SET_NAME(state, action){
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    SAVE_USER(state, action){
    const profile = action.payload
      state.user.name = profile.name
      state.user.email = profile.email
      state.user.photo = profile.phone
      state.user.bio = profile.bio
      state.user.photo = profile.photo
    },


  }
});

export const {SET_LOGIN,SET_NAME,SAVE_USER} = AuthSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectIsUser = (state) => state.auth.user
export default AuthSlice.reducer