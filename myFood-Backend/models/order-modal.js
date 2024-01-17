const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  orders: [
    {
      date: String,
      totalPayment: String,
      order: [
        {
          itemId: String,
          itemImg: String,
          itemName: String,
          price: String,
          qty: String,
          size: String,
        },
      ],
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
