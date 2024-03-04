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
  "/api/project/getAllProjectsSearchByUserId/",
  authentication,
  projectController.getAllProjectsSearchByUserId
);
router.get(
  "/api/project/getProjectTotalPages/",
  authentication,
  projectController.getProjectTotalPages
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
  "/api/project/getUsers/",
  authentication,
  projectController.GetUsersByProjectId
);

router.post(
  "/api/project/updateUsers/",
  authentication,
  projectController.UpdateUsersByProjectId
);
module.exports = router;
