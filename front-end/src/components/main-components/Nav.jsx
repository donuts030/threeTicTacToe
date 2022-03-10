import axios from "axios";
import React, { useState } from "react";
import { useEfftect } from "react";
import { Link } from "react-router-dom"

export default function Navbar(props){
    const logoutHandler = async() => {
        const logoutStatus = await axios.get("api/sessions/logout");
        if(logoutStatus.data.status === "Logged out"){
            props.setSession(null);
        }
        else{
            console.log("trouble logging out");
        }
    }
    return(
        <div className="navbar">
            {props.currUser?
            (<div>
                <div className="hello">Hi {props?.currUser?.username}</div>
                <div>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="loginButton" onClick={logoutHandler}>Logout</span>
                    </Link>
                </div>
            </div>
            )
            :(<div>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <span className="loginButton">Login/SignUp</span>
                </Link>
            </div>) 
            }

        </div>
    )
}