const AppSettings = require("../models/appSettingsModel");

const getLatestVersion = async (req, res) => {
  try {
    const appSettings = await AppSettings.findOne();

    if (!appSettings) {
      return res
        .status(404)
        .json({ data: null, message: "تنظیماتی پیدا نشد." });
    }

    return res
      .status(200)
      .json({ data: appSettings.version, message: "موفقیت آمیز" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `Error: ${error.message}` });
  }
};

const postLatestVersion = async (req, res) => {
  try {
    const { version } = req.body;

    // Find the first existing AppSettings model
    const existingAppSettings = await AppSettings.findOne();

    if (existingAppSettings) {
      // Update existing AppSettings
      existingAppSettings.version = version;
      await existingAppSettings.save();
      return res.status(200).json({
        data: existingAppSettings.version,
        message: "تنظیمات جدید با موفقیت ویرایش شد.",
      });
    } else {
      // Create a new AppSettings if none exists
      const newAppSettings = await AppSettings.create({ version });
      return res.status(201).json({
        data: newAppSettings.version,
        message: "تنظیمات با موفقیت ساخته شد.",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `Error: ${error.message}` });
  }
};

module.exports = {
  getLatestVersion,
  postLatestVersion,
};
