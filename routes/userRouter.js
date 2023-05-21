const express = require("express");
const router = express.Router();

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

router.get("/", cookieAuth, (req, res) => {
  const username = getUsername(req);
  res.redirect(`/user/${username}`);
});

router.get("/:user", cookieAuth, async (req, res) => {
  const username = getUsername(req);
  try {
    const posts = await Post.find({ author: req.params.user }).sort({
      _id: -1,
    });
    console.log(posts);
    const isUser = username === req.params.user;

    console.log(req.params.user, isUser, posts);
    if (posts.length > 0) {
      res.render("userPage", {
        user: username,
        posts: posts,
        isUser: isUser,
      });
    } else {
      res.render("error404", { user: username });
    }
  } catch (error) {
    res.status(404).render("error404", { user: username });
  }
});

module.exports = router;
