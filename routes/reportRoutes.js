const { Router } = require("express");
const router = new Router();
const reportController = require("../controllers/reportController");
const authentication = require("../middlewares/authMiddleware");

router.get(
  "/api/report/getAllReports/",
  authentication,
  reportController.getAllReportsByPagination
);

router.get(
  "/api/report/getAllReportsByUserId/",
  authentication,
  reportController.getAllReportsByUserId
);

router.get(
  "/api/report/getreportById/",
  authentication,
  reportController.getReportById
);

router.post(
  "/api/report/addReport/",
  authentication,
  reportController.addReport
);

router.put(
  "/api/report/updateReport/",
  authentication,
  reportController.updateReport
);

router.delete(
  "/api/report/deleteReport/",
  authentication,
  reportController.deleteReport
);

module.exports = router;
