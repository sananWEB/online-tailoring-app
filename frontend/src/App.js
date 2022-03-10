
import './App.css';
import { BrowserRouter, Route, useHistory, } from "react-router-dom";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { HomeScreen } from "./component/Home/HomeScreen";
import { SignUp } from "./component/user/SignUp";
import { SignIn } from "./component/user/SignIn";
import { UDashboard } from "./component/userDashboard/UDashboard";
import { useEffect, createContext,useReducer, useContext} from "react";
import {reducer,initialState} from './reducer/userReducer'

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  let {dispatch} = useContext(UserContext)
  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
      
    } 
    else{
      history.push('/')
    }  
    /* eslint-disable */
  }, [])
  return (
    <>
<Route exact path="/"  component={HomeScreen}></Route>
<Route path="/users/signup" component={SignUp}></Route>
<Route path="/users/signin" component={SignIn}></Route>
<Route path="/users/udashboard" component={UDashboard}></Route>
   </>
  );
}

function App() {
  let [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <div className="grid-container">
      <Header />
      <main className="main">
         <Routing/>
          
          </main>
     <Footer name="Arman ALi" />

    </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
