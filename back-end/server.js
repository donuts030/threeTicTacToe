const path = require("path");

//express
const express = require("express");
const app = express();

//mongoose
const mongoose = require("mongoose");
const db = mongoose.connection;

//.env import and configuration
require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI;

//import express-session
const session = require("express-session");

//import controllers
const userLoginController =  require("./controllers/userLogin.controller")
const boardDataController = require("./controllers/boardData.controller");

//connect to mongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongoose successfully!");
});

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo database connected successfully!"));
db.on("disconnected", () => console.log("mongo database disconnected"));

//app middleware
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: false,
  })
);

//route middleware
app.use("/api/login/", userLoginController);
app.use("/api/boarddata/", boardDataController);

//for build
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});