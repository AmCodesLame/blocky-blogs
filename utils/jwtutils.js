const jwt = require("jsonwebtoken");

function getUsername(req) {
  const cookie = req.cookies?.new_token;
  const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
  return decoded.username;
}

module.exports = { getUsername };
