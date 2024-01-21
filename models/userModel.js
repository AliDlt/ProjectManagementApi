const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phonenumber: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  passwordVersion: {
    type: Number,
    default: 0,
  },
  userRole: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },
  nationalCode: { type: String },
  projectIds: { type: [mongoose.Types.ObjectId], default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
