import React, {  useContext, useEffect, useState } from "react";
import "../../component/sytles/userMeasurement.css";
import ErrorNotice from "../misc/errorNotices";
import { useHistory } from "react-router-dom";
import M from "materialize-css"
import Axios from "axios";
import { UserContext } from "../../App";


export const MyMeasurement = () => {

  const [myMeasurement, setMeasurement] = useState([]);
  const {state}=useContext(UserContext);

 
  useEffect(() => {
    async function getMeasurement(){
       const res = await fetch('/users/udashboard/my-measurement/',{
           headers:{
               "auth":localStorage.getItem("jwt")
           }
       });

       const myMeasurements = await res.json()
       console.log("Get Measurement",myMeasurements.measurements)
       setMeasurement(myMeasurements.measurements)
      
     } 
     getMeasurement()
     
  }, []);

  console.log("my Measurement is  ",myMeasurement)
  // console.log("state",state)





  const [  fullLength, setfullLength] = useState();
  const [ shoulder, setshoulder] = useState();
  const [ Chest, setChest] = useState();
  const [ SleeveLength, setSleeveLength] = useState();
  const [  WaistLength, setWaistLength] = useState();
  const [ Neck, setNect] = useState();
  const [ Comment, setComment] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const submitMeasurement = async (e) => {
     e.preventDefault();

    try {
        const MeasurementResponse = await fetch("/users/udashboard/my-measurement/",{
          method:"post",
          headers:{
              "Content-Type":"application/json",
              "auth":localStorage.getItem("jwt")
            },
          body:JSON.stringify({
          fullLength,
          shoulder,
          Chest,
          SleeveLength,
          WaistLength,
          Neck,
          Comment,
          })
        });
        const UserMeasurement = await MeasurementResponse.json();
  
        if(UserMeasurement.msg){
          setError(UserMeasurement.msg)
        }else{
       
          console.log(UserMeasurement)
         
         M.toast({html: 'Sucessfuly Subimitted ! Congrat', classes:"#66bb6a green lighten-1"});
        
        }
      
    }
    catch (err) {
      
    }
  }


  return (
    <div>
      <h2 className="text-center">My Measurement</h2>
      <div className="my__measurement">
        <div className="form-measurement">
          {/* strt */}
          <form onSubmit = {submitMeasurement}>
            <label htmlFor="fname">Full length</label>
            <input
              type="text"
              name="firstname"
              placeholder="Full length.."
              //    value={firstName}
                 onChange={(e) => {
                   setfullLength(e.target.value);
                 }}
            />

            <label htmlFor="lname">shoulder</label>
            <input
              type="text"
              name="lastname"
              placeholder="Shoulder.."
              //    value={lastName}
              // value = {((userData || {}).user || {}).lastName}

                 onChange={(e) => {
                   setshoulder(e.target.value);
                 }}
            />
            {/* <label htmlFor="fname">Update Photo</label>
    
           <input value={userImg} type="text" onChange={(e)=>{setUserImg(e.target.value)}}></input> */}

            <label htmlFor="Email">Chest/Brust</label>
            <input
              type="text"
              name="Email"
              placeholder="Chest/Brust.."
              //    value={email}
              //    // value={((userData || {}).user || {}).email}
                 onChange={(e) => {
                   setChest(e.target.value);
                 }}
            />

            <label htmlFor="phone number">Sleeve length</label>
            <input
              type="text"
              name="phone number"
              placeholder="Sleeve length.."
              // value={((userData || {}).user || {}).phoneNumber}
              //    value={phoneNumber}
                 onChange={(e) => {
                   setSleeveLength(e.target.value);
                 }}
            />

            <label htmlFor="address">Waist Length</label>
            <input
              type="text"
              name="address"
              placeholder="Waist length.."
              //    value={address}
              // value={((userData || {}).user || {}).address}
                 onChange={(e) => {
                   setWaistLength(e.target.value);
                 }}
            />

            <label htmlFor="zip code">Neck Measurement</label>
            <input
              type="text"
              name="zip code"
              placeholder="Neck Measurement.."
              // value={((userData || {}).user || {}).zipCode}
                 onChange={(e) => {
                   setNect(e.target.value);
                 }}
            />

            <label htmlFor="zip code">Comment/Design/Color</label>
            <input
              type="text"
              name="zip code"
              placeholder="Comment.."
              // value={((userData || {}).user || {}).zipCode}
                 onChange={(e) => {
                   setComment(e.target.value);
                 }}
            />
            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}

            <input type="submit" value="Submit Measurement" />
          </form>

          {/* end */}
        </div>
        <div className="demo">
          <table>
            <thead>
              <tr>
                <th>Full length</th>
                <th>Shoulder</th>
                <th>Cheast</th>
                <th>Sleeve</th>
                <th>Waist</th>
                <th>Neck</th>
                <th>comment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {myMeasurement? myMeasurement.map(meas =>{
                  return(
                    <>
                    <td data-label="full length">{meas.fullLength}</td>
                    <td data-label="Issue Date">{meas.shoulder}</td>
                    <td data-label="Amount">{meas.Chest}</td>
                    <td data-label="Period">{meas.SleeveLength}</td>
                    <td data-label="Period">{meas.WaistLength}</td>
                    <td data-label="Period">{meas.Neck}</td>
                    <td data-label="Period">{meas.Comment}</td>
                    </>
                  )
                  
                }):""
                }
               
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
