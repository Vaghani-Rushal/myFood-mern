const { body } = require("express-validator");

const loginValidator = [
  body("email", "Invalid email.").isEmail(),
  body("password", "Invalid User credentials.").isLength({ min: 6 }),
];

module.exports = loginValidator;
