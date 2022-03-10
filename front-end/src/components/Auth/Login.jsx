import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login (props){
    const userInfoRef = useRef();
    const login = async (userInfo) =>{
        const data = await axios.post("/api/sessions/login", userInfo)
        console.log(data)
    }
    const handleLogin = () =>{
        const userInfo = { 
            username : userInfoRef.current.username.value,
            password : userInfoRef.current.password.value
        };
    }

    return (
        <div>
            <h3>Login</h3>
            <form ref={userInfoRef} >
                <label for="username">Username:</label>
                <input id="username" type="text"/><br/>
                <label for="password">Password:</label>
                <input id="password" type="password" /><br/>
                
            </form>
            <button onClick={handleLogin}>Login</button>
            <button onClick={()=>{props.setType("signup")}}>Don't have an account?</button>
        </div>
    )
}

