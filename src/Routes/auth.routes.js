const express = require("express");
const route = express.Router();

const { register, login, logout } = require("../Controller/auth.controller.js")

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout)


module.exports = route;