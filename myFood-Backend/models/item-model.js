const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "/assets/images/foodItems/item1.jpg",
  },
  options: [{}],

  description: {
    type: String,
    required: true,
  },
});

const FoodItem = new mongoose.model("Fooditem", itemSchema);
module.exports = FoodItem;
