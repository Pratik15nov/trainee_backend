const mongoose = require("mongoose");
const Category = require("../Category/category.modal");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  userId: {
    type: String,
    reqired: true,
    trim: true,
    ref:'user' 
  },
  productId: [{
    type: mongoose.Types.ObjectId,
    reqired: true,
    trim: true,
    ref:'product',
  }],
  isActive: { 
    type: Boolean,
    default: false,
    required: true,
  },
 
},
{
  timestamps: true,
});

const Cart = mongoose.model("cart", CategorySchema);
module.exports = Cart;
