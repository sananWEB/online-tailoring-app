import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { GlobalContext } from "./../../context/GlobalContexts";
// import axios from 'axios';
import ErrorNotice from "../misc/errorNotices";
import M from 'materialize-css'
import { UserContext } from "../../App";
import { useHistory } from "react-router";

export const SignIn = () => {

  const [email ,setEmail] = useState()
  const [password ,setPassword] = useState()
  const [error , setError] = useState();
  const history = useHistory();

  // form context api
 let {dispatch}= useContext(UserContext)


  const LoginData = async (e)=>{
    
    e.preventDefault();
    try {
      // const loginUser = {email, password};

      const loginRes = await fetch("/users/signin",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          email,
          password
        })
      });
    
      const UserData = await loginRes.json();
      

      if(UserData.msg){
        console.log("the error is ",UserData.msg)
        setError(UserData.msg);
       
      }
      else{
        console.log("userToken",UserData.token)
        localStorage.setItem("jwt",UserData.token);
        localStorage.setItem("user",JSON.stringify(UserData.user));
        dispatch({type:"USER",payload:UserData.user});
        console.log("USER DATA",UserData.user)
        M.toast({html:"Log In Successfuly" , classes:"#66bb6a green lighten-1"})
      
        history.push("/users/udashboard")
        
        
      }

      
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      M.toast({html:error , classes:"#e57373 red lighten-2"})
    }

  }

  return (
    <div className="form-container">
      <form onSubmit={LoginData}>
          <h2 className="text-center">LOG IN</h2>

          {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
        <label htmlFor="Email">Email</label>
        <input type="text" name="Email" placeholder="Email.." onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)}/>

        <input type="submit" value="SIGN IN" />
      </form>
    </div>
  );
};
