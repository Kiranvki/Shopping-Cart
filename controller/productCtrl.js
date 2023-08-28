const Product = require("../model/productModel");
const Coupon = require("../model/couponModel");
const Inventory = require("../model/inventoryModel");
const mongoose = require("mongoose");

const generateRandomOrderId = (len) => {
  let rString = "";
  let charSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#$";
  for (i = 0; i < len; i++)
    rString += charSet.charAt(Math.floor(Math.random() * charSet.length));
  return rString;
};

const ProductCtrl = {
  getAllProducts: async (req, res) => {
    try {
      let data = await Product.find({ quantity: { $gt: 0 }});
      res.json({ products: data, length: data.length });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      // res.json({msg:"hi"})
      let productId = generateRandomOrderId(8);
      let Product_id = mongoose.Types.ObjectId();
      let product = await Product.create({
        _id: Product_id,
        id: productId,
        title: req.body.title,
        desc: req.body.desc,
        quantity: req.body.quantity,
        price: req.body.price,
      });
      await Inventory.create({
        _id: Product_id,
        productId: productId,
        count: req.body.quantity,
      });
      res.status(200).json({ msg: "product created successfully " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCoupon: async (req, res) => {
    try {
      let product = await Coupon.create({
        code: req.body.code,
        discountPercent: req.body.discountPercent,
      });
      res.status(200).json({ msg: "coupon created successfully " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCoupon: async (req, res) => {
    try {
      let data = await Coupon.find();
      res.json({ data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ProductCtrl;
