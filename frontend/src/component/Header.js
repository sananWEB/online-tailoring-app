import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";


export const Header = () => {
  const history = useHistory();
  let {state,dispatch} = useContext(UserContext);

  if(state){
    console.log("hello for state header",state);
  }
return(
  <div>
    <div className="header">
      <div className="header-logo">
        {/* <button onClick={()=>{setSidebar(!isSidebar)}}>Menu</button> */}
        <Link to="/">Tailor App</Link>
      </div>

      <div className="header-menu">
     
        {
          (()=>{
            if (state && state.role === "user") {
              
              return (
                <>
                  <dev className="users-notification">
                      <i class="material-icons">add_alert</i>
                  </dev>

                  <Link to="/users/udashboard">
                    <div className="header-profile">
                      <img src="/images/OurTeam/arman.PNG" alt="arman"></img>
                      <span className="header-name">{state.firstName} </span>
                    </div>
                  </Link>
                </>
              );
            }
            else{
              return(
                <>
                 <li> <Link to="/users/signin">Login</Link></li>
                 <li> <Link to="/users/signup">Sign up</Link> </li>
                </>
              )
            }
          
          
          })()}
      </div>
    </div>
  </div>
)};
