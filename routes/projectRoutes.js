const { Router } = require("express");
const router = new Router();
const projectController = require("../controllers/projectController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/getAllProjects/:page&:count",
  authentication,

  projectController.getAllProjectsByPagination
);

router.get(
  "/api/getAllProjectsByUserId/:userId",
  authentication,

  projectController.getAllProjectsByUserId
);

router.get(
  "/api/getProjectById/:Id",
  authentication,
  projectController.getProjectById
);

router.post("/api/addProject/", authentication, projectController.addProject);

router.put(
  "/api/updateProject/:Id",
  authentication,
  projectController.updateProject
);

router.delete(
  "/api/deleteProject/:Id",
  authentication,
  projectController.deleteProject
);

module.exports = router;
