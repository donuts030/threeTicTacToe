const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");

const UserData = require("../models/userDataSchema");
const userDataSeed = require("../models/userData.seed");

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
        console.log("at /login/userData/seed", error);
    }
})

module.exports = Router;