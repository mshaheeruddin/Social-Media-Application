
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const {updateUser, deleteUser, getUser, getFriends, followUser, unfollowUser, getUsers} = require("../controllers/userController.js");
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken.js');



router.get("/checkauthentication",verifyToken, (req,res,next) => {
       res.send("You are logged in!")
})

router.get("/checkuser/:id",verifyUser, (req,res,next) => {
  res.send("You are logged in and you can delete your account!")
})

router.get("/checkadmin/:id",verifyAdmin, (req,res,next) => {
  res.send("Hello admin and you can delete all account!")
})


//update user
router.put("/:id", verifyUser, updateUser);

//delete user
router.delete("/:id", verifyAdmin, deleteUser);

//get all user
router.get("/", verifyUser, getUsers);

//get a user
router.get("/:id", verifyUser, getUser);

//get friends
router.get("/friends/:userId", verifyUser, getFriends)

//follow a user

router.put("/:id/follow", verifyUser, followUser);

//unfollow a user

router.put("/:id/unfollow", verifyUser, unfollowUser);

module.exports = router;