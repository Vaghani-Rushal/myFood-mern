const FoodCategory = require("../models/item-category-modal");
const FoodItem = require("../models/item-model");
const Order = require("../models/order-modal");

// get all food items from DB --> localhost:8000/api/items
const getItems = async (req, res) => {
  try {
    const categories = await FoodCategory.find({});
    const items = await FoodItem.find({});

    const categories_items = categories.map((category) => {
      return {
        categoryName: category.CategoryName,
        items: items.filter(
          (item) => item.CategoryName === category.CategoryName
        ),
      };
    });

    res.status(200).json({ success: true, foodItems: categories_items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get all food categories from DB --> localhost:8000/api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await FoodCategory.find({});

    res.status(200).json({ success: true, foodCategory: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// Update the order in DB --> localhost:8000/api/orders/updateorder
const updateOrders = async (req, res) => {
  try {
    const { userId, order, totalPayment } = req.body;
    const userExist = await Order.findOne({ userId: userId });

    const orderObj = {
      date: new Date(),
      totalPayment: totalPayment,
      order: order,
    };

    if (userExist) {
      try {
        const userOrders = await Order.findOneAndUpdate(
          { userId: userId },
          { $push: { orders: orderObj } }
        );

        res.status(200).json({ success: true, orderId: userOrders._id });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error." });
      }
    } else {
      try {
        const userOrders = await Order.create({
          userId: userId,
          orders: orderObj,
        });

        res.status(200).json({ success: true, orderId: userOrders._id });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error." });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

// Get all orders of user From DB --> localhost:8000/api/orders/getorder
const getOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orderItems = await Order.findOne({ userId: userId });

    res.status(200).json({ success: true, orderItems: orderItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { getItems, getCategories, updateOrders, getOrders };
