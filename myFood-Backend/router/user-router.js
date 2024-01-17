const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const loginValidator = require("../validators/login-validator");
const signupValidator = require("../validators/signup-validator");

router.route("/login").post(loginValidator, userController.getUser);
router.route("/signup").post(signupValidator, userController.creatUser);

module.exports = router;
