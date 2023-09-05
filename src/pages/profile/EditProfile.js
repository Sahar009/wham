import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Card from "../../component/card/Card"
import Loader from "../../component/loader/Loader"
import { selectIsUser } from "../../redux/features/authSlice"
import './profile.scss';
import { toast } from "react-toastify";
import { updateUser } from "../../service/authService"

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const user = useSelector(selectIsUser);
  const {email} = user;


useEffect(()=>{
if (!email){
  navigate('/profile');
}
},[email, navigate]);

const initialState = {
  name: user?.name,
  email: user?.email,
  phone: user?.phone,
  bio: user?.bio,
  photo: user?.photo,
};
const [profile, setProfile] = useState(initialState);
const [profileImage, setProfileImage] = useState("");

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProfile({ ...profile, [name]: value });
};

const handleImageChange = (e) => {
  setProfileImage(e.target.files[0]);
};
  

const saveProfile = async(e) =>{
  e.preventDefault();
  setIsLoading(true)
  try {
    //handle image upload
    let imageURL;
    if(
      profileImage && 
      (profileImage.type === 'image/jpeg' ||
      profileImage.type === 'image/jpg' ||
      profileImage.type === 'image/png')
      ){
        const image = new FormData()
        image.append('file', profileImage)
        image.append('cloud_name', 'dvjdvvnn3')
        image.append('upload_preset', 'sir6vk6h')

        //save to cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dvjdvvnn3/image/upload',
          {method:'post', body:image}
        );
        // console.log(response)
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

        //saveprofiel
        const formData = {
          name:profile.name,
          phone:profile.phone,
          bio:profile.bio,
          photo:profileImage ? imageURL : profile.photo,

        }
       const data =  await updateUser(formData)
       console.log(data);
       toast.success('user updated ')
       navigate('/profile')
       setIsLoading(false)
    


  } catch (error) {
    setIsLoading(false)
    toast.error(error.message)
    console.log(error.message);
  }
    }

return (
  <div className="profile --my2">
  {isLoading && <Loader />}

  <Card cardClass={"card --flex-dir-column"}>
    <span className="profile-photo">
      <img src={user?.photo} alt="profilepic" />
    </span>
    <form className="--form-control --m" onSubmit={saveProfile}>
      <span className="profile-data">
        <p>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile?.name}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label>Email:</label>
          <input type="text" name="email" value={profile?.email} disabled />
          <br />
          <code>Email cannot be changed.</code>
        </p>
        <p>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={profile?.phone}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile?.bio}
            onChange={handleInputChange}
            cols="30"
            rows="10"
          ></textarea>
        </p>
        <p>
          <label>Photo:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </p>
        <div>
          <button className="--btn --btn-primary">Save changes</button>
        </div>
      </span>
    </form>
  </Card>
  <br />
  {/* <ChangePassword /> */}
</div>
  )
}

export default EditProfile