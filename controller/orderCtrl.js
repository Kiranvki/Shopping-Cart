const Order = require("../model/orderModel");
// const Auth = require('../model/authModel');
const Product = require("../model/productModel");
const Inventory = require("../model/inventoryModel");

// stock and sold update
const updateStock = async (id, quantity, oldSold, oldStock) => {
  await Inventory.findOneAndUpdate(
    { _id: id },
    {
      count: Number(oldStock - quantity),
    }
  );
};

// random order id generation
const generateRandomOrderId = (len) => {
  let rString = "";
  let charSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#$";
  for (i = 0; i < len; i++)
    rString += charSet.charAt(Math.floor(Math.random() * charSet.length));
  return rString;
};

const orderCtrl = {
  newOrder: async (req, res) => {
    try {
      let orderId = generateRandomOrderId(8);
      let { cart, finalTotal } = req.body;

      cart.filter((item) => {
        return updateStock(item._id, item.quantity, item.sold, item.stock);
      });

      await Order.create({
        orderId,
        cart,
        finalTotal,
      });

    //   await Auth.findOneAndUpdate(
    //     { _id: req.user.id },
    //     {
    //       cart: [],
    //     }
    //   );

      return res
        .status(200)
        .json({ msg: `Order confirmed, order id is ${orderId}` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      let orders = await Order.find();
      return res.status(200).json({
        orders: orders,
        length: orders.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      res.json("update order status");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Order.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ msg: "Order deleted successfuly" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = orderCtrl;
