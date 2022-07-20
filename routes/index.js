const userController = require('../api/Controller/User/user.controller');
const categoryController = require('../api/Controller/Category/category.controller');
const productController = require('../api/Controller/Product/prodcut.controller');
const initialize = (app) => {
  app.use('/api/v1/user', userController);
  app.use('/api/v1/category', categoryController);
  app.use('/api/v1/product', productController);
}
module.exports = {initialize};