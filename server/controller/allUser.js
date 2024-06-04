// const userModel = require("../model/userModel");

// async function allUser(req, res) {
//     try {
//         const allUsers = await userModel.find({ _id: { $ne: req.userId } });

//         res.status(200).json({
//             message: "All users fetched successfully",
//             data: allUsers,
//             error: false,
//             success: true,
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: "Error fetching users: " + err,
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = allUser;



const userModel = require("../model/userModel");

async function allUser(req, res) {
    try {
        const allUsers = await userModel.find({ _id: { $ne: req.userId } });
        const logedInUser = await userModel.findById(req.userId);

        const followingIdsSet = new Set(logedInUser.following.map(user => user.toString()));


        const updatedUsers = allUsers.map(user => {
            if (followingIdsSet.has(user._id.toString())) {
                return { ...user.toObject(), follow: true };
            } else {
                return { ...user.toObject(), follow: false };
            }
        });

        res.status(200).json({
            message: "All users fetched successfully",
            data: updatedUsers,
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching users: " + err,
            error: true,
            success: false,
        });
    }
}

module.exports = allUser;
