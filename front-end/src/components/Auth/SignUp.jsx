import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp (props){
    const navigate = useNavigate();
    const newUserRef = useRef();

    const signUp = async (userInfo) =>{
        const data = await axios.post("/api/sessions/login", userInfo)
        return(data.data)
    }
    const handleSignUp = async() =>{
        const userInfo = { 
            username : newUserRef.current.username.value,
            password : newUserRef.current.password.value
        };
        const loginRes = await signUp(userInfo);
        console.log(loginRes.status);
        if(loginRes.status === "Signed Up"){
            navigate("/login")
        }
    }

    return(
        <div>
            <h3>Sign Up</h3>
            <form ref={newUserRef}>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text"/><br/>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" /><br/>
            </form>
            <button onClick={handleSignUp}>SignUp</button>
            <button onClick={()=>{props.setType("login")}}>Already have an account?</button>
        </div>
    )
}