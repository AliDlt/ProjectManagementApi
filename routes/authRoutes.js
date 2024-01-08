const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const authentication = require("../middlewares/authMiddleware");

// Login route
router.get("/api/Auth/login", authentication, authController.login);

// User registration route
router.post("/api/Auth/register", authentication, authController.register);

// Change password route
router.get(
  "/api/Auth/changepassword",
  authentication,
  authController.changePassword
);

// Check phone number route
router.get(
  "/api/Auth/checkphoneNumber",
  authentication,
  authController.checkphoneNumber
);

module.exports = router;
