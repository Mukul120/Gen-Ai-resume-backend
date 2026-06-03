const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./Routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const interviewRoutes = require("./Routes/Interview.routes.js");


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes)



module.exports = app;