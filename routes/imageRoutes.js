const { Router } = require("express");
const router = new Router();
const imageController = require("../controllers/imageController");
const authentication = require("../middlewares/authMiddleware");

// Upload file route
router.post(
  "/api/image/upload-image",
  authentication,
  imageController.uploadImage
);

// Download file route
router.get(
  "/api/image/download-image/:imageName",
  authentication,
  imageController.getImage
);

// Delete file route
router.delete(
  "/api/image/delete-image/:imageName",
  authentication,
  imageController.deleteImage
);

module.exports = router;
