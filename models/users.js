const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  avatar: String,
});

module.exports = mongoose.model("Users", UserSchema);
