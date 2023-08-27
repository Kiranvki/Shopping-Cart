const mongoose = require("mongoose");
const couponModel = new mongoose.Schema(
  {
    // productId: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "products",
    //   required: true,
    // },
    code: {
      type: String,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "coupon",
    timestamps: true,
  }
);

module.exports = mongoose.model("coupon", couponModel);
