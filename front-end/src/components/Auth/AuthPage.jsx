import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { useNavigate } from "react-router";

export default function AuthPage (props) {
    const navigate = useNavigate();
    const [pageType, setType] = useState("login");
    let pageDetails;
    if(pageType === "login"){
        pageDetails = <Login setType={setType} setSession={props.setSession}/>
    }
    else if (pageType === "signup"){
        pageDetails = <SignUp setType={setType}/>
    }

  return (
    <div className="overlay">
        <div className="authPage">
            {pageDetails}
        </div>
        <div className="exit" onClick={()=>{navigate("/")}}>
        </div>
    </div>
  )
}