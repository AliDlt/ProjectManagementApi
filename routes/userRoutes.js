const { Router } = require("express");
const router = new Router();

const userController = require("../controllers/userController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/getAllUsers/:page&:count",
  authentication,
  userController.getAllUsersByPagination
);

router.get("/api/getUserById/:Id", authentication, userController.getUserById);

router.post("/api/addUser/", authentication, userController.addUser);

router.put("/api/updateUser/:Id", authentication, userController.updateUser);

router.delete("/api/deleteUser/:Id", authentication, userController.deleteUser);

module.exports = router;
