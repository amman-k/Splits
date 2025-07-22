const express = require("express");
const router = express.Router();
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");


router.get('/',auth,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch{
    console.error(err.message);
    res.status(500).json({msg:"server error"});
  }
})

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    user = new User(username, email, password);
    const salt = await brcypt.genSalt(10);
    user.password = await brcypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Account does not exist,Kindly register" });
    }
    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
