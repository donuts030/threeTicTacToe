//const axios = require("axios").default;
import React, { useEffect, useState } from "react";
import './App.css';
import ThreeDisplay from './components/ThreeDisplay';
import Navbar from "./components/main-components/Nav";
import { Routes, Route} from "react-router";
import AuthPage from "./components/Auth/AuthPage";
import axios from "axios";


export default function App() {
  const [session, setSession] = useState(null);
  const [storedSession, setStored] = useState(false)
  useEffect(async ()=>{
    const checkSession = await axios.get("/api/sessions/auth");
    if(checkSession.data.status === "Session Found"){
      setSession(checkSession.data.session)
      //console.log("session found")
    }
  })
  return (
/*     <body> */
      <div className="App" >
        <h1>3D Tic Tac Toe</h1>
        <Navbar currUser={session?.currentUser} setSession={setSession}/>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/login" element={<AuthPage setSession={setSession}/>} />
        </Routes>
        <div className="three-container">
          <ThreeDisplay currUser={session?.currentUser}/>
        </div>
      </div>

  );
}
