const express = require("express");
const dotenv = require("dotenv").config();
const app = require("./src/app.js");
const db = require("./src/Config/db.js")


const PORT = process.env.PORT;

db();

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
