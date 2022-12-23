const User = require ("../models/User.js");
const Post = require("../models/Post.js");
const bcrypt = require("bcrypt");
//import { createError } from "../utils/error.js";
const jwt = require("jsonwebtoken")


const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const updatePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }


  const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      
    } catch (err) {
      res.status(500).json(err);
    }
  }


  const likeOrDislikePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const getPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }


  const getTimelinePosts = async (req, res) => {

    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  }

const getUserPosts = async (req, res) => {
    try {
      const user = await User.findOne({username: req.params.username})
      const posts = await Post.find({userId: user._id})
      res.status(200).json(posts)
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const getAllPosts = async (req,res,next)=>{
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
      
    }
  }

  module.exports = {
    createPost,
    updatePost,
    deletePost,
    likeOrDislikePost, 
    getPost,
    getTimelinePosts,
    getUserPosts,
    getAllPosts
  }