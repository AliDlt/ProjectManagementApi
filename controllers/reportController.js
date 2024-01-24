const Report = require("../models/reportModel");
const User = require("../models/userModel");

const getAllReportsByProjectId = async (req, res) => {
  try {
    const { page, count, projectId, userId } = req.query;

    let reports;

    if (userId) {
      // Check if the userRole is 0 (Admin)
      const isAdmin = await User.exists({ _id: userId, userRole: 0 });

      if (isAdmin) {
        // If userRole is 0 (Admin), get all reports
        reports = await Report.find()
          .skip((page - 1) * count)
          .limit(Number(count));
      } else {
        // For other userRoles, filter reports based on projectId and user's projects
        const user = await User.findById(userId);
        const userProjects = user.projectIds || [];
        console.log(user, userProjects);
        if (projectId && userProjects.includes(projectId)) {
          // If projectId is specified and it belongs to the user, get reports for that project
          reports = await Report.find({ projectId })
            .skip((page - 1) * count)
            .limit(Number(count));
        } else {
          // If projectId is not specified or doesn't belong to the user, get reports for user's projects
          reports = await Report.find({ projectId: { $in: userProjects } })
            .skip((page - 1) * count)
            .limit(Number(count));
        }
      }
    } else {
      // Handle the case when userId is not set
      reports = await Report.find()
        .skip((page - 1) * count)
        .limit(Number(count));
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: reports, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.query;

    const report = await Report.findById(id);

    if (!report) {
      return res
        .status(400)
        .json({ message: "گزارشی یافت نشد.", data: null, status: false });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: report, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const addReport = async (req, res) => {
  try {
    // Assuming req.user contains the user's ID
    const createdBy = req.user._id;

    // Add the createdBy field to the report data
    const reportData = { ...req.body, createdBy };

    const report = await Report.create(reportData);

    return res
      .status(201)
      .json({ message: "موفقیت آمیز", data: report, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.query;

    const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedReport) {
      return res
        .status(400)
        .json({ message: "گزارشی یافت نشد.", data: null, status: false });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: updatedReport, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res
        .status(400)
        .json({ message: "گزارشی یافت نشد.", data: null, status: false });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: true, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

module.exports = {
  getAllReportsByProjectId,
  getReportById,
  addReport,
  updateReport,
  deleteReport,
};
