const express = require("express")
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {register, login} = require("../controllers/authController.js")

//REGISTER
router.post("/register",register);

//LOGIN
router.post("/login", login);

//Generate JWT

const generateToken = (id) => {
  return jwt.sign ({ id }, process.env.JWT_SECRET, {
       expiresIn: '30d',
  })
}

module.exports = router;