const Coupon = require("../model/couponModel");

const applyDiscountMiddleware = async (req, res, next) => {
  try {
    const couponCode = req.body.coupon;

    Coupon.findOne({ code: couponCode })
      .select("discountPercent")
      .exec((err, coupon) => {
        if (err) {
          res.status(500).json({ msg: err.message });
        } else {
          if (coupon) {
            const discountPercent = coupon.discountPercent;
            const finalTotal = req.body.finalTotal;
            const discountedPrice = finalTotal * (1 - discountPercent / 100);

            // Attach the discounted price and other relevant data to the request object
            req.discountedPrice = discountedPrice;

            next(); // Proceed to the next middleware or route handler
          } else {
            res.status(500).json("Coupon Not found");
          }
        }
      });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred" });
  }
};

module.exports = applyDiscountMiddleware;
