const WishlistModal = require("./whishlist.modal");
const pagination = require("../../../helper/pagination");

exports.create = async (userWishlist) => {
  try {
    const existUser = await WishlistModal.findOne({
      userId: userWishlist.userId.trim(),
    });

    if (existUser !== null) {
      if (
        existUser.wishlist
          .map((obj) => obj.productId.toString())
          .includes(userWishlist.productId)
      ) {
        const removeProduct = await existUser.wishlist.filter(
          (obj) => obj.productId.toString() !== userWishlist.productId
        );

        existUser.wishlist = removeProduct;
        const result = await WishlistModal.findByIdAndUpdate(
          existUser._id,
          existUser
        );

        if (result) {
          return {
            success: true,
            message: "Product removed Successfully",
            data: removeProduct,
          };
        } else {
          return {
            success: false,
            message: "Not removed successfulyy",
            data: null,
          };
        }
      } else {
        existUser.wishlist.push({
          productId: userWishlist.productId.trim(),
        });
        await WishlistModal.findByIdAndUpdate(existUser._id, existUser);
        return {
          success: true,
          message: "Products Pushed successfully",
          data: existUser,
        };
      }
    } else {
      const wishlistInfo = WishlistModal({
        userId: userWishlist.userId.trim(),
        wishlist: [
          {
            productId: userWishlist.productId.trim(),
          },
        ],
      });
      const userData = await wishlistInfo.save();
      return {
        success: true,
        message: "Product added successfully to wishlist",
        data: userData,
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
    const respose = await pagination.list(WishlistModal, where, datum, [
      "wishlist.productId",
      "userId",
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
