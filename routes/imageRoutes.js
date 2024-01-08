const { Router } = require("express");
const router = new Router();
const imageController = require("../controllers/imageController");
const authentication = require("../middlewares/authMiddleware");

// Upload file route
router.post("/api/upload-image", authentication, imageController.uploadImage);

// Download file route
router.get(
  "/api/download-image/:imageName",
  authentication,
  imageController.getImage
);

module.exports = router;
