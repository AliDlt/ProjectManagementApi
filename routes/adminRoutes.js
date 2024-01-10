const { Router } = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");
const authentication = require("../middlewares/authMiddleware");

router.get("/api/admin/getAdmins", authentication, adminController.getAdmins);
router.post("/api/admin/addAdmin", authentication, adminController.addAdmin);
router.put(
  "/api/admin/updateAdmin/:id",
  authentication,
  adminController.updateAdmin
);
router.get(
  "/api/admin/getAdminById/:id",
  authentication,
  adminController.getAdminById
);
router.delete(
  "/api/admin/deleteAdmin/:id",
  authentication,
  adminController.deleteAdmin
);

module.exports = router;
