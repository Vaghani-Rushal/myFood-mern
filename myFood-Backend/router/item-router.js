const express = require("express");
const router = express.Router();

const itemController = require("../controllers/item-controller");

router.route("/items").get(itemController.getItems);
router.route("/categories").get(itemController.getCategories);
router.route("/orders/updateorder").post(itemController.updateOrders);
router.route("/orders/getorder").post(itemController.getOrders);

module.exports = router;
