const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  situation: { type: String },
  usersIds: { type: [mongoose.Types.ObjectId], default: [] },
  reportsIds: { type: [mongoose.Types.ObjectId], default: [] },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
