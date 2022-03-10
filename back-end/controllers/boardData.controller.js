const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose")

const BoardData = require("../models/boardDataSchema");
const boardData_seed = require("../models/boardData.seed");
const User = require("../models/userDataSchema");
const req = require("express/lib/request");

Router.get("/seed", async (req, res) => {
    try {
        await BoardData.deleteMany({});
        const newBoardData = await BoardData.create(boardData_seed);
        res.status(200).json({
        status: "ok",
        message: "boardData seeded",
        data: newBoardData,
        });
    } catch (error) {
        console.log("at /boarddata/seed", error);
    }
});

Router.get("/getdata/:id", async (req, res)=>{
    try {
        const getBoardData = await BoardData.findById(req.params.id)
        res.status(200).json({
            status:"ok",
            message: "Board data gotten",
            data: getBoardData
        })
    }
    catch(error){
        console.log(error);
    }
})

Router.post("/add", async (req, res) => {
    const newBoardData = req.body.boardData;
    try{
        const createNewBoard = await BoardData.create(newBoardData);
        const oldBoard = await User.findById(req.body.userid);
        await BoardData.deleteOne({_id: oldBoard.boardData});
        const updateUser = await User.findByIdAndUpdate(
            req.body.userid,
            {$set:{boardData: createNewBoard._id}},
            {new: true}
            );
        res.status(200).json({
            status:"ok",
            message: "Board data changed",
            data: updateUser
        })

    }catch(error){
        console.log(error);
    }
})

module.exports = Router;