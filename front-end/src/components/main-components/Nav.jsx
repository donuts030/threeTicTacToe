import React, { useState } from "react";
import { useEfftect } from "react";
import { Link } from "react-router-dom"

export default function Navbar(props){

    return(
        
        <div className="navbar">
            <div>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <span className="loginButton">Login/SignUp</span>
                </Link>
            </div>
        </div>
    )
}