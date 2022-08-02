const PromoCodeModal = require("./promocode.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (coupondata) => {
  try {
    const data = new PromoCodeModal(coupondata);
    const userData = await data.save();

    if (userData) {
      return {
        success: true,
        message: "Coupon created successfully",
        data: userData,
      };
    } else {
      return {
        success: true,
        message: "Coupon not created ",
        data: userData,
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

exports.ondelete = async (id) => {
  try {
    const existsCoupon = await PromoCodeModal.findOne({ _id: id.trim() });
    if (existsCoupon) {
      const result = await PromoCodeModal.findByIdAndUpdate(id, {
        isActive: false,
      });
      if (result) {
        return {
          success: true,
          message: "Coupon deactivated successfully",
          data: result,
        };
      } else {
        return {
          success: true,
          message: "Coupon not deactivated ",
          data: result,
        };
      }
    } else {
      return {
        success: false,
        message: "Coupon does not exists ",
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
    const respose = await pagination.list(PromoCodeModal, where, datum, []);
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
