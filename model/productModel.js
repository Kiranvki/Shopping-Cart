const mongoose = require("mongoose");
const productModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide product title"],
      trim: true,
      unique: true,
      maxLength: [100, "Name cannot be more than 100 characters"],
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "please provide price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please Provide quantity"],
    },
    available: {
      type: Number,
      // ref: "count",
      // required: true,
    },
    desc: {
      type: String,
      required: [true, "please provide desc"],
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productModel);
