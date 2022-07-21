const { responseMessages } = require("../../../helper/responseMessages");
const pagination = require("../../../helper/pagination");
const Category = require("../../Services/Category/category.modal");
const catogoryModal = require("../../Services/Category/category.modal");

exports.Exists = async (where) => {
  try {
    const category = await catogoryModal.findOne(where);
    if (category) {
      return {
        success: true,
        message: responseMessages.categoryFound,
        data: category,
      };
    } else {
      return {
        success: false,
        message: responseMessages.categoryNotfound,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.categoryError,
      data: error.message,
    };
  }
};

exports.create = async (file, body) => {
  try {
    const categoryInfo = new catogoryModal({
      categoryName: body.categoryName,
      categoryImg: file.path,
      isActive: true,
    });

    const categoryData = await categoryInfo.save();
    if (categoryData) {
      return {
        success: true,
        message: responseMessages.categoryAdded,
        data: categoryData,
      };
    } else {
      return {
        success: true,
        message: responseMessages.categoryNotadded,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.update = async (params_id, category) => {
  try {
    const options = { new: true };
    const result = await Category.findByIdAndUpdate(
      params_id,
      category,
      options
    );

    if (result) {
      return {
        success: true,
        message: responseMessages.categoryUpdated,
        data: result,
      };
    } else if (!result) {
      return {
        success: false,
        message: responseMessages.categoryNotUpdated,
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

exports.softDelete = async (params_id) => {
  try {
    const result = await Category.findByIdAndUpdate(params_id, {
      isActive: false,
    });
    if (result) {
      return {
        success: true,
        message: responseMessages.categoryDeleted,
        data: result,
      };
    } else {
      return {
        success: true,
        message: responseMessages.categorynotDeleted,
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
    const respose = await pagination.list(Category, where, datum);
    if (respose) {
      return {
        success: true,
        message: responseMessages.dataFound,
        data: respose,
      };
    } else {
      return {
        success: false,
        message: responseMessages.dataNotFound,
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
