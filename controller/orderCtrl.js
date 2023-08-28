const Order = require("../model/orderModel");
// const Auth = require('../model/authModel');
const Product = require("../model/productModel");
const Inventory = require("../model/inventoryModel");
const Coupon = require("../model/couponModel");

// stock and sold update
const updateStock = async (productId, quantity) => {
  try {
    const product = await Product.findOne({ id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const newAvailableQty = product.quantity - quantity;

    if (newAvailableQty < 0) {
      throw new Error("Insufficient stock");
    }

    product.available = newAvailableQty;
    await product.save();

    const inventory = await Inventory.findOne({ _id: product._id });

    console.log("object :>> ", product._id);
    if (inventory) {
      inventory.count = product.available;
      await inventory.save();
    }
  } catch (error) {
    throw error;
  }
};

// random order id generation
const generateRandomOrderId = (len) => {
  let rString = "";
  let charSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (i = 0; i < len; i++)
    rString += charSet.charAt(Math.floor(Math.random() * charSet.length));
  return rString;
};

const orderCtrl = {
  newOrder: async (req, res) => {
    try {
      let { cart, finalTotal,coupon } = req.body;
      let orderId = generateRandomOrderId(8);
      let discountedPrice = req.discountedPrice;

      for (const item of cart) {
        await updateStock(item.productId, item.count);
      }

      await Order.create({
        coupon:coupon,
        orderId:orderId,
        cart,
        totalAmount: finalTotal,
        amountOwed: discountedPrice,
        
      });

      return res
        .status(200)
        .json({orderId:orderId});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      let productOrderId = req.params.productOrderId;

      const order = await Order.findOne({orderId: productOrderId });

      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }

      const responseProducts = await Promise.all(
        order.cart.map(async (item) => {
          const product = await Product.findOne({ id: item.productId });
          return {
            _id:product._id,
            productId: product.productId,
            title: product.title,
            description: product.desc,
            priceInRs:product.price,
            count: product.quantity - product.available,
          };
        })
      );

      res.json({
        coupon:order.coupon,
        Products:responseProducts,
        totalAmount:order.totalAmount,
        amountOwed:order.amountOwed
      });
    } catch (error) {
      res.status(500).json({ msg: "An error occurred" });
    }
  },
  
};

module.exports = orderCtrl;
