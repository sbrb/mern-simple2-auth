const userModel = require("../model/userModel");

async function followUser(req, res) {
    const { treatedUserId } = req.params;

    try {
        const userToUpdate = await userModel.findById(req.userId);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Account not found.', error: true });
        }
        if (userToUpdate.following.includes(treatedUserId)) {
            return res.status(400).json({ message: 'User already followed', error: true });
        }

        const followIdChecked = await userModel.findById(treatedUserId);
        if (!followIdChecked) {
            return res.status(404).json({ message: 'User Does not exists.', error: true });
        }

        userToUpdate.following.push(treatedUserId);
        await userToUpdate.save();
        res.json({ message: 'User followed successfully', error: false });

    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Error following user', error: true });
    }
}

async function unfollowUser(req, res) {
    const { treatedUserId } = req.params;

    try {
        const userToUpdate = await userModel.findById(req.userId);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Account not found.', error: true });
        }

        if (!userToUpdate.following.includes(treatedUserId)) {
            return res.status(400).json({ message: 'User already unfollowed', error: true });
        }

        const unfollowIdChecked = await userModel.findById(treatedUserId);
        if (!unfollowIdChecked) {
            return res.status(404).json({ message: 'User Does not exists.', error: true });
        }

        userToUpdate.following = userToUpdate.following.filter(id => id.toString() !== treatedUserId.toString());
        await userToUpdate.save();

        res.json({ message: 'User unfollowed successfully', error: false });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Error unfollowing user', error: true });
    }
}

module.exports = { followUser, unfollowUser };




