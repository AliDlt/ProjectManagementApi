const { Router } = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");
const authentication = require("../middlewares/authMiddleware");

router.get("/api/getAdmins", authentication, adminController.getAdmins);
router.post("/api/addAdmin", authentication, adminController.addAdmin);
router.put("/api/updateAdmin/:id", authentication, adminController.updateAdmin);
router.get(
  "/api/getAdminById/:id",
  authentication,
  adminController.getAdminById
);
router.delete(
  "/api/deleteAdmin/:id",
  authentication,
  adminController.deleteAdmin
);

module.exports = router;
