const userController = require('../api/Controller/User/user.controller');
const categoryController = require('../api/Controller/Category/category.controller');
const initialize = (app) => {
  app.use('/api/v1/user', userController);
  app.use('/api/v1/category', categoryController);
}
module.exports = {initialize};