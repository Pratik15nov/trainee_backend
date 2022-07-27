const CartModal = require("../../Services/Cart/cart.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (userProducts) => {
  try {
    const cartInfo = new CartModal(userProducts);
    const userData = await cartInfo.save();

    if (userData) {
      return {
        success: true,
        message: "Products added successfully",
        data: userData,
      };
    } else {
      return {
        success: false,
        message: "Products not  added ",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_PRODUCTS",
      data: error.message,
    };
  }
};

exports.Exists = async (where) => {
  try {
    const userProducts = await CartModal.findOne(where);
    if (userProducts) {
      return {
        success: true,
        message: "DATA FOUND SUCCESSFULLY",
        data: userProducts,
      };
    } else {
      return {
        success: false,
        message: "DATA NOT FOUND ",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FINDING_DATA",
      data: null,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(CartModal, where, datum);
    if (respose) {
      return {
        success: true,
        message: "DATA FOUND SUCCESSFULLY",
        data: respose,
      };
    } else {
      return {
        success: false,
        message: "DATA NOT FOUND",
        data: respose,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};
