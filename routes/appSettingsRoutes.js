const { Router } = require("express");
const router = new Router();
const appSettingsController = require("../controllers/appSettingsController");
const authentication = require("../middlewares/authMiddleware");

// Get the latest app version route
router.get(
  "/api/getAppSettings",
  authentication,
  appSettingsController.getLatestVersion
);
router.post(
  "/api/updateAppSettings",
  authentication,
  appSettingsController.postLatestVersion
);

module.exports = router;
