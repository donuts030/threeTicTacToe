const mongoose = require("mongoose"); // require mongoose
const { Schema } = mongoose; // create a shorthand for the mongoose Schema constructor

// create a new Schema
const userSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        boardData: {type : mongoose.Schema.Types.ObjectId, ref: "board_data"}
    },
    { timestamps: true }
)

module.exports = mongoose.model("users", userSchema);
