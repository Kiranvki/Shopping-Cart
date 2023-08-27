const mongoose = require("mongoose");
const inventoryModel = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "products",
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "inventory",
    timestamps: true,
  }
);

module.exports = mongoose.model("inventory", inventoryModel);
