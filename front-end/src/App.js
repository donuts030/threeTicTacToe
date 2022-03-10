//const axios = require("axios").default;
import React, { useEffect, useState } from "react";
import './App.css';
import ThreeDisplay from './components/ThreeDisplay';
import Navbar from "./components/main-components/Nav";
import { Routes, Route} from "react-router";
import AuthPage from "./components/Auth/AuthPage";


export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
/*     <body> */
      <div className="App">
        <h1>3D Tic Tac Toe</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/login" element={<AuthPage/>} />
        </Routes>
        <div className="three-container">
          <ThreeDisplay />
        </div>
      </div>

  );
}
