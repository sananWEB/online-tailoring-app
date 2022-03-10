import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/errorNotices";
import { UserContext } from "../../App";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Uploady from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-button";
// import UploadPreview from "@rpldy/upload-preview";




export const UpdateProfile = () => {

  const history = useHistory();
  let {state,dispatch} = useContext(UserContext);


  let [firstName, setFirstName] = useState();
  let [lastName, setlastName] = useState();
  let [email, setEmail] = useState();
  let [phoneNumber, setPhoneNumber] = useState();
  let [gender, setGender] = useState();
  let [address, setAddress] = useState();
  let [country, setCountry] = useState()
  let [states, setState] = useState();
  let [city, setCity] = useState();
  let [zipCode, setZipCode] = useState("16100");
  let [error, setError] = useState();
  let[userImg,setUserImg]=useState();

  // const filterBySize = (file) => {
  //   //filter out images larger than 5MB
  //   return file.size <= 5242880;
  // };
  if(state){
    firstName = state.firstName;
    lastName = state.lastName;
    email = state.email;
    phoneNumber = state.phoneNumber;
    address = state.address;
   
  }

  async function updateUser(e) {
    e.preventDefault();

    try {
      const updateUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        address,
        country,
        states,
        city,
        zipCode,
        userImg
      };

      await axios.put(`/users/${state._id}`, updateUser);

      console.log("user update successfully");
      history.push("/udashboard/update-profile");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      
    }
  }

  return (
    <div >
      <h2 className="text-center">Your Profile</h2>
      {/* <ToastContainer /> */}
      <div className="form-container-update"> 
      <div className="user-profile-pic">
            <img src={userImg} alt="jfkds"></img>
            <button>uplaod</button>

            {/* <Uploady
              destination={{ url: "/images/profilePic/"}}
              fileFilter={filterBySize}
              accept="image/*"
              >
              <UploadButton />
              <UploadPreview />   
            </Uploady> */}
      </div>
      <div className="user-update-form">
      <form onSubmit={updateUser}>
     
        
       
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          name="firstname"
          placeholder="Your name.."
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Your last name.."
          value={lastName}
          // value = {((userData || {}).user || {}).lastName}

          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />
         <label htmlFor="fname">Update Photo</label>
       
        <input value={userImg} type="text" onChange={(e)=>{setUserImg(e.target.value)}}></input>
    

        <label htmlFor="Email">Email</label>
        <input
          type="text"
          name="Email"
          placeholder="Email.."
          value={email}
          // value={((userData || {}).user || {}).email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="phone number">Phone Number</label>
        <input
          type="text"
          name="phone number"
          placeholder="Phone number.."
          // value={((userData || {}).user || {}).phoneNumber}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />

        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="address">address</label>
        <input
          type="text"
          name="address"
          placeholder="Address.."
          value={address}
          // value={((userData || {}).user || {}).address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <label htmlFor="country">Country</label>
        <select
          name="country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option value="pakistan">Pakistan</option>
        </select>

        <label htmlFor="state">State</label>
        <select
          name="state"
          onChange={(e) => {
            setState(e.target.value);
          }}
        >
          <option value="pubjab">Pubjab</option>
        </select>

        <label htmlFor="city">City</label>
        <select
          name="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="attock">Attock</option>
        </select>

        <label htmlFor="zip code">Zip code</label>
        <input
          type="text"
          name="zip code"
          placeholder="Your last name.."
          // value={((userData || {}).user || {}).zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
        />
        {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}

        <input type="submit" value="Update Profile" />
      </form>
      </div>
    </div>
     
        
    <br/>
    <br/>
    </div>
  );
};
