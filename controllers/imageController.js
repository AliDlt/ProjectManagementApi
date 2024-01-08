const Report = require("../models/reportModel");

const uploadImageConfig = require("../configs/uploadImageConfig");

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
          await uploadImageConfig.uploadImage(
            req.file.buffer,
            req.file.filename
          );

          return res.status(201).json({
            message: "تصویر با موفقیت آپلود شد",
            data: true,
          });
        } else {
          return res
            .status(400)
            .json({ message: "تصویری یافت نشد.", data: false });
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

module.exports = {
  uploadImage,
  getImage,
};
