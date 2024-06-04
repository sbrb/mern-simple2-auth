const userModel = require("../model/userModel")
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignUp(req, res) {
    try {
        const { firstName, lastName, userName, phone, email, password, profilePic } = req.body;

        if (!firstName) {
            return res.status(400).json({
                message: "Please provide first name.",
                error: true,
                success: false
            })
        }

        if (!lastName) {
            return res.status(400).json({
                message: "Please provide last name.",
                error: true,
                success: false
            })
        }

        if (!userName) {
            return res.status(400).json({
                message: "Please provide user name.",
                error: true,
                success: false
            })
        }

        if (!phone) {
            return res.status(400).json({
                message: "Please provide phone.",
                error: true,
                success: false
            })
        }

        if (!email) {
            return res.status(400).json({
                message: "Please provide email.",
                error: true,
                success: false
            })
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password.",
                error: true,
                success: false
            })
        }


        const duplicateUserName = await userModel.findOne({ userName });
        if (duplicateUserName) {
            return res.status(400).json({
                message: "Pick another username.",
                error: true,
                success: false
            })
        }

        const duplicatePhone = await userModel.findOne({ phone });
        if (duplicatePhone) {
            return res.status(400).json({
                message: "Phone No already exits.",
                error: true,
                success: false
            })
        }

        const duplicateEmail = await userModel.findOne({ email });
        if (duplicateEmail) {
            return res.status(400).json({
                message: "Email already exits.",
                error: true,
                success: false
            })
        }
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        message: err,
                        error: true,
                        success: false
                    })
                }
                const newUser = new userModel({
                    firstName,
                    lastName,
                    userName,
                    phone,
                    email,
                    password: hash,
                    profilePic
                });

                const savedUser = await newUser.save();

                const payload = {
                    _id: savedUser._id,
                    email: savedUser.email
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '365d'
                });

                return res.status(200).json({
                    token,
                    data: savedUser,
                    error: false,
                    success: true,
                    message: "Registration successful."
                });
            });
        });
    } catch (error) {
        console.error("SignUp error:", error);
        res.status(500).json({
            message: "Internal server error.",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUp;
