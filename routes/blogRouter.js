const express = require("express");
const app = express();
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

router.get("/:id", cookieAuth, async (req, res) => {
  const username = getUsername(req);
  try {
    console.log(req.params.id);
    const post = await Post.findOne({ _id: req.params.id });

    console.log(post);
    const isUser = post.author === username;

    res.render("singlePost", { post: post, isUser: isUser, user: username });
  } catch (error) {
    res.status(404).render("error404", { user: username });
  }
});

router.get("/edit/:id", cookieAuth, async (req, res) => {
  const username = getUsername(req);
  try {
    const post = await Post.findOne({ _id: req.params.id });

    console.log(post);
    if (post.author !== username) {
      alert("you are not the author of this post!");
      return res.redirect("/");
    }
    //   console.log(post);
    res.render("editPost", { post: post, user: username });
  } catch (error) {
    res.status(404).render("error404", { user: username });
  }
});

module.exports = router;
