const express = require("express");
const route = express.Router();

const { register, login, logout, getMe } = require("../Controller/auth.controller.js");
const { authUser } = require("../middleware/authUser.js");

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout)
route.get("/getme", authUser, getMe)


module.exports = route;