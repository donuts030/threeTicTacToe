const mongoose = require("mongoose");
const { Schema } = mongoose; 

// create a new Schema
const boardSchema = new Schema(
    {
        boardPlacements: {type: Object},
        boardOrientations: {type: Object}
    },
    { timestamps: true }
)

module.exports = mongoose.model("board_data", boardSchema)
