const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const authentication = require("../middlewares/authMiddleware");

router.post("/api/auth/login", authentication, authController.login);

router.post("/api/auth/register", authentication, authController.register);

router.post(
  "/api/auth/checkRegister",
  authentication,
  authController.checkRegister
);

router.post(
  "/api/auth/changePassword",
  authentication,
  authController.changePassword
);

router.post(
  "/api/auth/getUserByPhoneNumber",
  authentication,
  authController.getUserByPhoneNumber
);

module.exports = router;
