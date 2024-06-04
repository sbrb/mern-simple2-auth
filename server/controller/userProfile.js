const userModel = require("../model/userModel");

async function userProfile(req, res) {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            data: user,
            error: false,
            success: true,
        });
    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({
            message: "Error fetching user details",
            error: true,
            success: false,
        });
    }
}

module.exports = userProfile;
