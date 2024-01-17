const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
});

const FoodCategory = new mongoose.model("Foodcategories", categorySchema);
module.exports = FoodCategory;
