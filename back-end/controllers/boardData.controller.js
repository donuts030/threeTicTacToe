const express = require("express");
const Router = express.Router();

const BoardData = require("../models/boardDataSchema");
const boardData_seed = require("../models/boardData.seed")

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

module.exports = Router;