const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const storage = multer.memoryStorage();

const uploadConfig = multer({
  limits: {
    fileSize: 1024 * 1024 * 1,
    files: 1,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new multer.MulterError("LIMIT_FILE_TYPE", "Invalid file type"));
    }
    cb(null, true);
  },
  storage: storage,
});

const uploadImage = async (buffer, fileName) => {
  try {
    const processedImageBuffer = await sharp(buffer)
      .jpeg({ quality: 60 })
      .toBuffer();

    // Generate a unique filename
    const imageName = `${uuidv4()}-processed.jpg`;

    // Define the target directory
    const targetDirectory = path.join(__dirname, "..", "public/images");

    // Ensure the target directory exists
    await fs.mkdir(targetDirectory, { recursive: true });

    // Save the processed image buffer to the file path
    const imagePath = path.join(targetDirectory, imageName);
    await fs.writeFile(imagePath, processedImageBuffer);

    return {
      message: "Image uploaded and processed successfully",
      fileInfo: { fileName: imageName },
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadConfig,
  uploadImage,
};
