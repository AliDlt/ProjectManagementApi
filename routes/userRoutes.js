const { Router } = require("express");
const router = new Router();

const userController = require("../controllers/userController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/user/getAllUsers/:page&:count",
  authentication,
  userController.getAllUsersByPagination
);

router.get(
  "/api/user/getUserById/:Id",
  authentication,
  userController.getUserById
);

router.post("/api/user/addUser/", authentication, userController.addUser);

router.put(
  "/api/user/updateUser/:Id",
  authentication,
  userController.updateUser
);

router.delete(
  "/api/user/deleteUser/:Id",
  authentication,
  userController.deleteUser
);

module.exports = router;
