const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RightsSchema = new Schema(
  {
    roleId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "role",
    },
    rights: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rights = mongoose.model("right", RightsSchema);
module.exports = Rights;
