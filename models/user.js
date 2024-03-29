const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile_number: { type: Number, required: true },
  password: { type: String, required: true },
  isAdmin : { type: Boolean, required: true ,default:false },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;