const { Router } = require("express");
const router = new Router();
const reportController = require("../controllers/reportController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/getAllReports/:page&:count",
  authentication,
  reportController.getAllReportsByPagination
);

router.get(
  "/api/getAllReportsByUserId/:userId",
  authentication,

  reportController.getAllReportsByUserId
);

router.get(
  "/api/getreportById/:Id",
  authentication,
  reportController.getReportById
);

router.post("/api/addReport/", authentication, reportController.addReport);

router.put(
  "/api/updateReport/:Id",
  authentication,
  reportController.updateReport
);

router.delete(
  "/api/deleteReport/:Id",
  authentication,
  reportController.deleteReport
);

module.exports = router;
