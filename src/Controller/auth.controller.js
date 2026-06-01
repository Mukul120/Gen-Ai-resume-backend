const User = require("../model/user.model.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, name) => {
    const token = jwt.sign({ id: id, username: name }, process.env.JWT_SECRET, { expiresIn: "1d" })
    return token
}

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
}

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "user data required" });
        }

        const isUserExist = await User.findOne({
            $or: [
                { email: email },
                { username: username },
            ]
        })

        if (isUserExist) return res.status(401).json({ message: "user alrady exist" })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        const token = generateToken(user._id, user.username);

        res.cookie("token", token, cookieOptions)
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: "user creadentials required" });
        }

        const isEmailExist = await User.findOne({ email });
        if (!isEmailExist) return res.status(401).json({ message: "email not found" })

        const correctPassword = await bcrypt.compare(password, isEmailExist.password);
        if (!correctPassword) return res.status(401).json({ message: "invaid creadentails" })

        const token = generateToken(isEmailExist._id, isEmailExist.username);

        res.cookie("token", token, cookieOptions)
        return res.status(200).json({ message: "Login successful" });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const logout = (req, res) => {
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({ message: "Logout successfully" })
}

module.exports = {
    register,
    login,
    logout
}
