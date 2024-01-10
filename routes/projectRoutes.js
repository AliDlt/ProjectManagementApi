const { Router } = require("express");
const router = new Router();
const projectController = require("../controllers/projectController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/project/getAllProjects/:page&:count",
  authentication,

  projectController.getAllProjectsByPagination
);

router.get(
  "/api/project/getAllProjectsByUserId/:userId",
  authentication,

  projectController.getAllProjectsByUserId
);

router.get(
  "/api/project/getProjectById/:Id",
  authentication,
  projectController.getProjectById
);

router.post(
  "/api/project/addProject/",
  authentication,
  projectController.addProject
);

router.put(
  "/api/project/updateProject/:Id",
  authentication,
  projectController.updateProject
);

router.delete(
  "/api/project/deleteProject/:Id",
  authentication,
  projectController.deleteProject
);

module.exports = router;
