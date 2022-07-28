const userController = require("../api/Controller/User/user.controller");
const categoryController = require("../api/Controller/Category/category.controller");
const productController = require("../api/Controller/Product/prodcut.controller");
const cartController = require("../api/Controller/Cart/cart.controller");
const promocodeController = require("../api/Controller/PromoCode/promocode.controller");
const headerController = require("../api/Controller/Header/header.controller");

const initialize = (app) => {
  app.use("/api/v1/user", userController);
  app.use("/api/v1/category", categoryController);
  app.use("/api/v1/product", productController);
  app.use("/api/v1/cart", cartController);
  app.use("/api/v1/promocode", promocodeController);
  app.use("/api/v1/header", headerController);
};
module.exports = { initialize };
