const userController = require("../api/Controller/User/user.controller");
const categoryController = require("../api/Controller/Category/category.controller");
const productController = require("../api/Controller/Product/prodcut.controller");
const cartController = require("../api/Controller/Cart/cart.controller");
const promocodeController = require("../api/Controller/PromoCode/promocode.controller");
const headerController = require("../api/Controller/Header/header.controller");
const addressController = require("../api/Controller/Address/address.controller");
const stripeController = require("../api/Controller/Stripe/stripe.controller");
const redeemcodeController = require("../api/Controller/RedeemCode/redeemCode.controller");
const razorpayController = require("../api/Controller/Razorpay/razorpay.controller")

const initialize = (app) => {
  app.use("/api/v1/user", userController);
  app.use("/api/v1/category", categoryController);
  app.use("/api/v1/product", productController);
  app.use("/api/v1/cart", cartController);
  app.use("/api/v1/promocode", promocodeController);
  app.use("/api/v1/header", headerController);
  app.use("/api/v1/address", addressController);
  app.use("/api/v1/stripe", stripeController);
  app.use("/api/v1/redeemcode", redeemcodeController);
  app.use("/api/v1/razorpay", razorpayController);
};
module.exports = { initialize };
