const OrderModal = require("./order.modal");
const pagination = require("../../../helper/pagination");
const cartService = require("../Cart/cart.service");
const email = require("../../../helper/email");
const UserService = require("../../Services/User/user.service");

exports.create = async (orderDetails) => {
  try {
    const data = new OrderModal(orderDetails);
    const orderData = await data.save();

    if (orderData) {
      const { success, message, data } = await cartService.delOrderCart(
        orderDetails
      );

      if (success) {
        const { success, message, data } = await UserService.Exists({
          _id: orderDetails.userId,
        });

        if (success) {
          const { successMail, messageMail } = await email.sendOrderSuccess(
            data,
            orderDetails
          );
          if (successMail) {
            return {
              success: successMail,
              message: messageMail,
            };
          } else {
            return {
              success: successMail,
              message: messageMail,
            };
          }
        } else {
          return {
            success: false,
            message: "User not Found",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "Order not Placed",
          data: null,
        };
      }
    } else {
      return {
        success: false,
        message: "Order data not added",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error,
      data: null,
    };
  }
};

exports.update = async (params_id, orderDetails) => {
  try {
    const options = { new: true };
    const result = await OrderModal.findByIdAndUpdate(
      params_id,
      orderDetails,
      options
    );

    if (result) {
      return {
        success: true,
        message: "User's orderdetails updation successfull ",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "User's orderdetails updation not successfull ",
        data: null,
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

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(OrderModal, where, datum, [
      "userId",
      "addressId",
      "promocodeId",
      "priceDetail.productId",
    ]);
    if (respose) {
      return {
        success: true,
        message: "data found successfully",
        data: respose,
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