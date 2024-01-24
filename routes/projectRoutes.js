const { Router } = require("express");
const router = new Router();
const projectController = require("../controllers/projectController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/project/getAllProjectsByUserId/",
  authentication,
  projectController.getAllProjectsByUserId
);

router.get(
  "/api/project/getProjectById/",
  authentication,
  projectController.getProjectById
);

router.post(
  "/api/project/addProject/",
  authentication,
  projectController.addProject
);

router.put(
  "/api/project/updateProject/",
  authentication,
  projectController.updateProject
);

router.delete(
  "/api/project/deleteProject/",
  authentication,
  projectController.deleteProject
);

router.get(
  "/api/project/getUsers/:id/",
  authentication,
  projectController.GetUsersByProjectId
);

router.post(
  "/api/project/updateUsers/:id/",
  authentication,
  projectController.UpdateUsersByProjectId
);
module.exports = router;
