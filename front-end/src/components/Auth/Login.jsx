import React, { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login (props){
    const navigate = useNavigate();
    const userInfoRef = useRef();
    const [errorMessage, setError] = useState("");
    const login = async (userInfo) =>{
        const data = await axios.post("/api/sessions/login", userInfo)
        return(data.data)
    }
    const handleLogin = async() =>{
        const userInfo = { 
            username : userInfoRef.current.username.value,
            password : userInfoRef.current.password.value
        };
        const loginRes = await login(userInfo);
        console.log(loginRes.status);
        if(loginRes.status === "Logged in"){
            props.setSession(loginRes.session);
            navigate("/")
        }
        else{
            setError(loginRes.status);
        }
    }
    return (
        <div>
            <h3>Login</h3>
            <form ref={userInfoRef} >
                <label htmlFor="username">Username:</label>
                <input id="username" type="text"/><br/>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" /><br/>
                <span style={{color:"red"}} className="loginError">{errorMessage}</span>
            </form>
            
            <button onClick={handleLogin}>Login</button>
            <button onClick={()=>{props.setType("signup")}}>Don't have an account?</button>
        </div>
    )
}

