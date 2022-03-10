const bcrypt = require("bcrypt");
const express = require("express");
const Router = express.Router();
const User = require("../models/userDataSchema");

Router.post("/login/", async(req, res)=>{
    try{
        const userData = await User.findOne({ username: req.body.username});
        if(!userData) {
            res.status(200).json({
                message: "No user found",
                status: "Login failed: user not found"
            })
        }
        else{
            if (bcrypt.compareSync(req.body.password, userData.password)){
                req.session.currentUser = {
                    userid: userData._id,
                    username: userData.username,
                    boardId: userData.boardData
                }
                res.status(200).json({
                    message: "Login success",
                    status: "Logged in",
                    session: req.session,
                })
            }
            else{
                res.status(200).json({
                    message: "Wrong password",
                    status: "Login failed: password error"
                })
            }
        }
    }catch(error){
        console.log("at login", error);
    }
})

Router.get("/logout", async(req, res)=>{
    req.session.destroy(()=>{
        res.status(200).json({
            message: "Logout successful",
            status:"Logged out"
        })
    })
})


Router.get("/auth/", async(req, res)=>{
    if(!req.session.currentUser) {
        res.status(200).json({
            status: "No current session",
            session: req.session
        })
    } else {
        res.status(200).json({
            status: "Session Found",
            session: req.session
        })
    }
})

module.exports = Router;