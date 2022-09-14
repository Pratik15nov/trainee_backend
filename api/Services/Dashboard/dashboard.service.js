const OrderModal = require("../../Services/Order/order.modal");
const ProductModal = require("../Product/product.modal");
const pagination = require("../../../helper/pagination");

exports.list = async (where, datum) => {
  try {
    const products = await ProductModal.find();
    console.log(products);
    const order = await OrderModal.find();
    console.log('order: ', order);
   
    if (products) {
      return {
        success: true,
        message: "data found successfully",
        data: products,
      };
    } else {
      return {
        success: false,
        message: "data not found",
        data: respose,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
