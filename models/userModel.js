const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phonenumber: { type: String, required: true },
  nationalCode: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  userRole: {
    type: String,
    enum: ["Contractor", "Supervisor"],
  },
  projectIds: { type: [mongoose.Types.ObjectId], default: [] },
  passwordVersion: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
