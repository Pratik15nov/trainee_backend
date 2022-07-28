const pagination = require("../../../helper/pagination");
const HeaderModal = require("./header.modal");

exports.create = async (body, file) => {
  try {
    const headerinfo = new HeaderModal({
      name: body.name,
      description: body.description,
      Img: file.path,
      categoryId: body.categoryId,
    });
    // const headerinfo = { ...body, img: file.path };
    const headerData = await headerinfo.save();

    if (headerData) {
      return {
        success: true,
        message: "header image added successfully ",
        data: headerData,
      };
    } else {
      return {
        success: true,
        message: "header image cannot able to add",
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

exports.Exists = async (where) => {
  try {
    const header = await HeaderModal.findOne(where);
    if (header) {
      return {
        success: true,
        message: "DATA FOUND SUCCESSSFULLY",
        data: header,
      };
    } else {
      return {
        success: false,
        message: "DATA NOT FOUND",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error,
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const respose = await pagination.list(HeaderModal, where, datum, [
      "categoryId",
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
    };
  }
};
