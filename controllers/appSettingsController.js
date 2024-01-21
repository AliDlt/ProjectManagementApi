const AppSettings = require("../models/appSettingsModel");

const getLatestVersion = async (req, res) => {
  try {
    const appSettings = await AppSettings.findOne();

    if (!appSettings) {
      await AppSettings.create({ version: "1.0.0" });
      return res.status(200).json({
        data: "1.0.0",
        message: "نسخه پیشفرض با موفقیت ایجاد شد.",
        status: true,
      });
    }

    return res.status(200).json({
      data: appSettings.version,
      message: "دریافت نسخه با موفقیت انجام شد.",
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `Error: ${error.message}`, status: false });
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
        status: false,
      });
    } else {
      // Create a new AppSettings if none exists
      const newAppSettings = await AppSettings.create({ version });
      return res.status(201).json({
        data: newAppSettings.version,
        message: "تنظیمات با موفقیت ساخته شد.",
        status: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `Error: ${error.message}`, status: false });
  }
};

module.exports = {
  getLatestVersion,
  postLatestVersion,
};
