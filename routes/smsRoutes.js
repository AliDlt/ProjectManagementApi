const { Router } = require("express");
const router = new Router();
const smsController = require("../controllers/smsController");
const authentication = require("../middlewares/authMiddleware");

router.post(
  "/api/sms/sendSMS/",
  authentication,
  smsController.send
);
router.post("/api/sms/verifySMS", authentication, smsController.verify);

module.exports = router;
