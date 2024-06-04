const express = require('express')
const router = express.Router()

const userSignUp = require('../controller/userSignUp')
const userSignin = require('../controller/userSiginIn')
const userProfile = require('../controller/userProfile')
const allUser = require('../controller/allUser')
const verifyToken = require('../middlewares/verifyToken')
const { followUser, unfollowUser } = require('../controller/userActions');


router.post("/sign-up", userSignUp)
router.post("/sign-in", userSignin)
router.get("/all-user", verifyToken, allUser)
router.post("/user-details", verifyToken, userProfile)
router.post('/follow/:treatedUserId', verifyToken, followUser);
router.post('/unfollow/:treatedUserId', verifyToken, unfollowUser);

module.exports = router
