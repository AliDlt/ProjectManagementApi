const Report = require("../models/reportModel");

const uploadImageConfig = require("../configs/uploadImageConfig");

const fs = require("fs").promises;
const path = require("path");

const uploadImage = async (req, res) => {
  try {
    //return image name

    // Process the uploaded file
    uploadImageConfig.uploadConfig.single("file")(
      req,
      res,
      async function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: err, data: null, status: false });
        }

        if (req.file) {
          const info = await uploadImageConfig.uploadImage(
            req.file.buffer,
            req.file.filename
          );
          console.log(info);
          return res.status(201).json({
            message: "موفقیت آمیز",
            data: info.fileInfo.fileName,
            status: true,
          });
        } else {
          return res
            .status(400)
            .json({ message: "تصویری یافت نشد.", data: null, status: false });
        }
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, data: null, status: false });
  }
};

const getImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const filePath = path.join(__dirname, "../", "public/images", imageName);

    res.sendFile(filePath, (err) => {
      if (err) {
        // Handle file not found or other errors
        res.status(404).json({
          message: "image not found",
          data: null,
          status: false,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

const deleteImage = async (req, res) => {
  //return bool
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "..", "public/images", imageName);

    // Check if the file exists
    await fs.access(imagePath, fs.constants.F_OK);

    // Attempt to delete the file
    await fs.unlink(imagePath);

    return res.status(200).json({
      message: "Image deleted successfully",
      data: null,
      status: true,
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      // File not found
      return res
        .status(400)
        .json({ message: "Image not found", data: null, status: false });
    } else {
      // Other error
      console.error("Error deleting image:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", data: null, status: false });
    }
  }
};

module.exports = {
  uploadImage,
  getImage,
  deleteImage,
};
