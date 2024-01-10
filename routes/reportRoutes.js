const { Router } = require("express");
const router = new Router();
const reportController = require("../controllers/reportController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/report/getAllReports/:page&:count",
  authentication,
  reportController.getAllReportsByPagination
);

router.get(
  "/api/report/getAllReportsByUserId/:userId",
  authentication,
  reportController.getAllReportsByUserId
);

router.get(
  "/api/report/getreportById/:Id",
  authentication,
  reportController.getReportById
);

router.post(
  "/api/report/addReport/",
  authentication,
  reportController.addReport
);

router.put(
  "/api/report/updateReport/:Id",
  authentication,
  reportController.updateReport
);

router.delete(
  "/api/report/deleteReport/:Id",
  authentication,
  reportController.deleteReport
);

module.exports = router;
