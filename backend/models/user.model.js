const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    lowercase: true,
    trim: true,
  },
  password:{
    type:String,
    required:[true,'password is required'],
    minlength:[6,'password must be 6 characters long'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User= mongoose.model('User',UserSchema);

module.exports = User;
