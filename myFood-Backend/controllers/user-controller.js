const User = require("../models/user-modal");
const { validationResult } = require("express-validator");

// Get user credentials from DB --> localhost:8000/api/login
const getUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user credentials." });
    }

    const isPasswordMatch = await userExist.comparePassword(password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password." });
    }

    const token = await userExist.generateToken();
    res
      .status(200)
      .json({ success: true, token: token, userId: userExist._id });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error,
    });
  }
};

// create new user --> localhost:8000/api/signup
const creatUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const { name, email, address, password } = req.body;

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist." });
    }

    const userCreated = await User.create({ name, email, address, password });
    const token = await userCreated.generateToken();
    res
      .status(200)
      .json({ success: true, token: token, userId: userCreated._id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { getUser, creatUser };
