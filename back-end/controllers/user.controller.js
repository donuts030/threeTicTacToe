const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");

const UserData = require("../models/userDataSchema");
const userDataSeed = require("../models/userData.seed");

Router.post("/checkUser", async (req, res) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (!existingUser) {
        res.status(200).json({
          message: "Username available",
          status: "Username available"
        });
      } else {
        res.status(200).json({
          message: "Username is taken",
          status: "Username unavailable"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

Router.post("/newUser", async (req, res)=>{
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
    )
    try {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
        }
        const createdUser = User.create(newUser);
        res.status(200).json({
            data: createdUser,
            status: "User Created"
        })
    }catch (error){
        console.log(error);
    }
})

Router.get("/userdata/seed", async (req, res) => {
    try{
        await UserData.deleteMany({});
        const seeds = userDataSeed.map((data) => {
            return {...data, password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))}
        });
        const seededUsers = await UserData.create(seeds);
        res.status(200).json({
            status:"ok",
            message:"users seeded",
            data: seededUsers,
        })
    }catch(error){
        console.log("at /user/userData/seed", error);
    }
})

module.exports = Router;