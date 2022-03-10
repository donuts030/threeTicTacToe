const bcrypt = require("bcrypt");
const express = require("express");
const Router = express.Router();
const User = require("../models/userDataSchema");

Router.post("/login", async(req, res)=>{
    try{
        const userData = await User.findOne({ username: req.body.username});
        if(!userData) {
            res.status(404).json({
                message: "no user found",
                status: "Login failed: user not found"
            })
        }
        else{
            if (bcrypt.compareSync(req.body.password, userData.password)){
                res.status(200).json({
                    message: "login success",
                    status: "logged in",
                })
            }
            else{
                res.status(200).json({
                    message: "wrong password",
                    status: "Login failed: password error"
                })
            }
        }
    }catch(error){
        console.log("at login", error);
    }
})


module.exports = Router;