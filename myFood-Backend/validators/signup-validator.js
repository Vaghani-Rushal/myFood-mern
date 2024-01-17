const { body } = require("express-validator");

const signupValidator = [
  body("name", "Name must be of minimum 3 characters long.").isLength({
    min: 3,
  }),
  body("name", "Name must be of mximum 30 characters.").isLength({ max: 30 }),
  body("email", "Invalid email.").isEmail(),
  body("password", "Password must be of minimum 6 characters long.").isLength({
    min: 6,
  }),
  body("address", "Invalid Address.").isLength({ min: 3 }),
];

module.exports = signupValidator;
