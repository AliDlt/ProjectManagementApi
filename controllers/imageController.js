const Report = require("../models/reportModel");

const uploadImageConfig = require("../configs/uploadImageConfig");

const fs = require("fs").promises;
const path = require("path");

const uploadImage = async (req, res) => {
  try {
    // Process the uploaded file
    uploadImageConfig.uploadConfig.single("file")(
      req,
      res,
      async function (err) {
        if (err) {
          return res.status(400).json({ message: err, data: null });
        }

        if (req.file) {
          const info = await uploadImageConfig.uploadImage(
            req.file.buffer,
            req.file.filename
          );

          return res.status(201).json({
            message: info.message,
            data: info.fileInfo,
          });
        } else {
          return res
            .status(400)
            .json({ message: "تصویری یافت نشد.", data: null });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message, data: null });
  }
};

const getImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const report = await Report.findOne({ imageName });
    if (report) {
      const url = `${
        "http://" + process.env.URL + ":" + process.env.PORT
      }/images/${report.imageName}`;
      return res.status(200).json({ message: "successful", data: url });
    } else {
      return res.status(404).json({ message: "no image", data: null });
    }
  } catch (error) {
    return res.status(500).json({ message: error, data: null });
  }
};

const deleteImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "..", "public/images", imageName);

    // Check if the file exists
    await fs.access(imagePath, fs.constants.F_OK);

    // Attempt to delete the file
    await fs.unlink(imagePath);

    return res
      .status(200)
      .json({ message: "Image deleted successfully", data: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      // File not found
      return res.status(404).json({ message: "Image not found", data: false });
    } else {
      // Other error
      console.error("Error deleting image:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", data: false });
    }
  }
};

module.exports = {
  uploadImage,
  getImage,
  deleteImage,
};
