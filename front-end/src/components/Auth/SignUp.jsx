import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp (props){

    return(
        <div>
            <h3>Sign Up</h3>
            <form>
                <label for="username">Username:</label>
                <input id="username" type="text"/><br/>
                <label for="password">Password:</label>
                <input id="password" type="text" /><br/>
                <input type="submit" value="Sign Up"/>
            </form>
            <button onClick={()=>{props.setType("login")}}>Already have an account?</button>
        </div>
    )
}