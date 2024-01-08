const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  projectId: { type: mongoose.Types.ObjectId },
  imageName: { type: String },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
