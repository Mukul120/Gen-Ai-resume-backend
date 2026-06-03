const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model.js");



exports.authUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(409).json({ message: "unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ _id: decoded.id }).select("-password");
    if (!user) return res.statu0(404).json({ message: "user not found" })

    req.user = user
    next();
}