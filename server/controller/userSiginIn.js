const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require("../model/userModel");

async function userSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide email.",
                error: true,
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password.",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                error: true,
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password.",
                error: true,
                success: false
            });
        }

        const payload = {
            _id: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '365d'
        });

        res.status(200).json({
            token,
            error: false,
            success: true,
            message: "Login successful."
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error.",
            error: true,
            success: false
        });
    }
}

module.exports = userSignin;
