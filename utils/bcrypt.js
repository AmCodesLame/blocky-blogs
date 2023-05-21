//bcrypt
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function hashSync(pass) {
  return bcrypt.hashSync(pass, salt);
}
function compareSync(pass1, pass2) {
  return bcrypt.compareSync(pass1, pass2);
}

module.exports = { hashSync, compareSync };
