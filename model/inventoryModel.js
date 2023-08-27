const mongoose = require("mongoose");
const inventoryModel = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  },
  {
    collection: "inventory",
    timestamps: true,
  }
);

module.exports = mongoose.model("inventory", inventoryModel);
