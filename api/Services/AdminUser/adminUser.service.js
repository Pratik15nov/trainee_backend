const adminUserModl = require("./adminUser.modal");
const pagination = require("../../../helper/pagination");
const bcrypt = require("bcryptjs");
const email = require("../../../helper/email");

exports.create = async (file, user) => {
  try {
    const existUser = await adminUserModl.findOne({ email: user.email.trim() });
    if (existUser != null) {
      return {
        success: false,
        message: "AdminUser already exists",
        data: null,
      };
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(String(user.password), salt);

    const info = new adminUserModl({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: encryptedPassword,
      phoneNumber: user.phoneNumber,
      userImg: file.path,
      role: user.role,
    });

    const { successMail, messageMail } = await email.sendForAdminRegister(user);
    if (successMail) {
      const userData = await info.save();
      if (userData) {
        return {
          success: true,
          message: "User created successfully",
          data: userData,
        };
      } else {
        return {
          success: true,
          message: "User not created ",
          data: userData,
        };
      }
    } else {
      return {
        success: false,
        message: "User not created , plz try again later",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.Exists = async (where) => {
  try {
    const user = await adminUserModl.findOne(where).populate("role");

    if (user) {
      return { success: true, message: "USER FOUND SUCCESSFULLY", data: user };
    } else {
      return {
        success: false,
        message: "USER NOT FOUND",
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

exports.update = async (params_id, user) => {
  try {
    const result = await adminUserModl.findByIdAndUpdate(params_id, user);

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
    const respose = await pagination.list(adminUserModl, where, datum, [
      "role",
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

exports.hardDelete = async (params_id) => {
  try {
    const result = await adminUserModl.findByIdAndDelete(params_id);

    if (result) {
      return {
        success: true,
        message: "Data deletion successfulyy",
        data: result,
      };
    } else {
      return {
        success: false,
        message: "Data not deleted ",
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
