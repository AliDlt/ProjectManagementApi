const { Router } = require("express");
const router = new Router();

const userController = require("../controllers/userController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/user/getAllUsers",
  authentication,
  userController.getAllUsersByPagination
);

router.get(
  "/api/user/getUserById/",
  authentication,
  userController.getUserById
);

router.post("/api/user/addUser", authentication, userController.addUser);

router.put("/api/user/updateUser/", authentication, userController.updateUser);

router.delete(
  "/api/user/deleteUser",
  authentication,
  userController.deleteUser
);

module.exports = router;
