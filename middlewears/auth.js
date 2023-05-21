const jwt = require("jsonwebtoken");

const cookieAuth = async (req, res, next) => {
  const token = req.cookies?.new_token;
  if (!token) return res.redirect("/login");
  const check = await jwt.verify(token, process.env.JWT_SECRET);
  if (!check) return res.redirect("/login");
  next();
};

module.exports = { cookieAuth };
