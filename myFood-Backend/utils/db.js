const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connection Succesful.");
  } catch (error) {
    console.log("Database Connection Fail.");
  }
};

module.exports = connectDb;
