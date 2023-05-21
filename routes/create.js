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

router.get("/profile", (req, res) => {
  const { new_token: token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } else {
    res.json({ verified: false });
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("new_token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json("OK");
});

router.post(
  "/create",
  cookieAuth,
  upload.single("blogImage"),
  async (req, res) => {
    try {
      const { title, summary, desc } = req.body;
      const username = getUsername(req);
      const postDoc = await Post.create({
        title,
        author: username,
        summary,
        desc,
        image: req.file.path,
      });

      res.json(postDoc);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get("/create", cookieAuth, (req, res) => {
  username = getUsername(req);
  res.render("createPost.ejs", { user: username });
});

router.put(
  "/create",
  cookieAuth,
  upload.single("blogImage"),
  async (req, res) => {
    try {
      const { title, summary, desc, postId } = req.body;
      const user = getUsername(req);
      const post = await Post.findById(postId);
      const author = post.author;
      const imageUpdate = req.file ? req.file.path : post.image;

      if (user !== author)
        return res
          .status(400)
          .json({ message: "you are not the author dumbass" });

      const resN = await Post.updateOne(
        { _id: postId },
        {
          title,
          summary,
          desc,
          image: imageUpdate,
        }
      );
      console.log(resN);

      res.status(200).json({ message: "post edited succesfully" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

router.delete("/create", cookieAuth, async (req, res) => {
  const { postId } = req.body;
  const user = getUsername(req);
  const post = await Post.findById(postId);
  const author = post.author;
  if (user !== author)
    return res.status(400).json({ message: "you are not the author dumbass" });
  const dlt = await Post.deleteOne({ _id: postId });
  res.json(dlt);
});

module.exports = router;
