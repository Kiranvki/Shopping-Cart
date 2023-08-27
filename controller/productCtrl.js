const Product = require("../model/productModel");
const Coupon = require("../model/couponModel");

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
      let data = await Product.find();
      res.json({ products: data, length: data.length });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      // res.json({msg:"hi"})
      let productId = generateRandomOrderId(8);
      let product = await Product.create({
        id: productId,
        title: req.body.title,
        desc: req.body.desc,
        quantity: req.body.quantity,
        price: req.body.price,
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

  updateProduct: async (req, res) => {
    try {
      let product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!product) return res.status(400).json({ msg: "Product not exists" });
      res.status(200).json({ msg: "Product updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ProductCtrl;