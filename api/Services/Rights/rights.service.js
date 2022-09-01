const RightsModal = require("./rights.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (rightsDetails) => {
  try {
    const data = new RightsModal({
      roleId: rightsDetails.roleId.trim(),
      rights: rightsDetails.rights,
    });
    const rightsData = await data.save();

    if (rightsData) {
      return {
        success: true,
        message: "Data added successfulyy",
        data: rightsData,
      };
    } else {
      return {
        success: false,
        message: "Data not added ",
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

exports.update = async (params_id, user) => {
  try {
    console.log("params_id: ", params_id);
    console.log("user: ", user);
    const result = await RightsModal.findByIdAndUpdate(params_id, user);

    if (result) {
      return {
        success: true,
        message: "DATA UPDATION SUCCESSFULL",
        data: result,
      };
    } else if (!result) {
      return {
        success: false,
        message: "DATA NOT UPDATED",
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
    const respose = await pagination.list(RightsModal, where, datum, [
      "roleId",
    ]);
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
