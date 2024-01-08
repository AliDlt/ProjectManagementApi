const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phonenumber: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  passwordVersion: {
    type: Number,
    default: 0,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
