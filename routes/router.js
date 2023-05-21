const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//mongo models
const User = require("../models/user");
const Post = require("../models/post");

router.use(express.json());

//jwt
const jwt = require("jsonwebtoken");
const { getUsername } = require("../utils/jwtutils");

//bcrypt
const bcrypt = require("../utils/bcrypt");

// cookie parser
const cookieParser = require("cookie-parser");
router.use(cookieParser());

//auth middlewears
const { cookieAuth } = require("../middlewears/auth");

//multer
const { upload } = require("../utils/multer");

router.get("/", cookieAuth, async (req, res) => {
  const postDB = await Post.find().sort({ _id: -1 }).limit(6);
  // console.log(postDB);
  const username = getUsername(req);
  res.render("index", { posts: postDB, user: username });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDB = await User.findOne({ username });
  if (!userDB) return res.status(400).json({ message: "Username Not Found" });

  const check = bcrypt.compareSync(password, userDB?.password);

  if (!check) return res.status(400).json({ message: "wrong credentials" });

  console.log("verified");

  const token = await jwt.sign(
    { id: userDB._id, username },
    process.env.JWT_SECRET
  );

  res.cookie("new_token", token, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });
  res.json({ username, password, verified: true });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
