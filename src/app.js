const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./Routes/auth.routes.js")


app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use("/api/auth", authRoutes);




module.exports = app;