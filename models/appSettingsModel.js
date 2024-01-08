const mongoose = require("mongoose");

const appSettingsSchema = new mongoose.Schema({
  version: { type: String },
});

const AppSettings = mongoose.model("AppSettings", appSettingsSchema);

module.exports = AppSettings;
