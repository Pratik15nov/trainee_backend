const category = require("../category/category.modal");


exports.Exists = async (where) => {
  try {
    const category = await category.findOne(where);
    if (category) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
};

exports.create = async (data) => {
  try {
    const categoryInfo = category({
      categoryName: data.categoryName,
      categoryImg: data.file.path,
      isActive: true,
    });

    console.log("INFO", categoryInfo);
    const categoryData = await info.save();
    console.log("CATEGORY DATA", categoryData);
    if (categoryData) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
};
