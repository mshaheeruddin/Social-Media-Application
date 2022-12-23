const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const {createPost, updatePost, deletePost, likeOrDislikePost, getPost, getTimelinePosts, getUserPosts, getAllPosts} = require("../controllers/postController.js")
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken.js');

//create a post
router.post("/", verifyUser, createPost);

//update a post
router.put("/:id", verifyUser, updatePost);

//delete a post
router.delete("/:id", verifyUser, deletePost);

//like / dislike a post
router.put("/:id/like", verifyUser, likeOrDislikePost);

//get a post
router.get("/:id", verifyUser,getPost);

//get timeline posts
router.get("/timeline/:userId", verifyUser, getTimelinePosts);


//get users all posts
router.get("/profile/:username",verifyUser, getUserPosts);

//get all posts
router.get("/", verifyAdmin,getAllPosts);


module.exports = router;