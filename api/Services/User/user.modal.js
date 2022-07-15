const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber:{ 
        type: Number,
        required: true,
        trim: true
    },
    refreshToken:{
        type: String,
        default: '',
        trim: true,
    },
    isActive: {
        type: boolean,
        default: false,
        required: true
    }
  }, {
    timestamps: true
});
  const User = mongoose.model('user', UserSchema);
  module.exports = User;