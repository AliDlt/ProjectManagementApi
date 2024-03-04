const Report = require("../models/reportModel");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

const getAllReportsByProjectId = async (req, res) => {
  try {
    const { page = 1, count = 10, projectId, userId } = req.query;

    // Check if userId is provided
    if (!userId) {
      return res.status(403).json({ message: "Access denied", status: false });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    // Check if the user is an admin
    const isAdmin = user.userRole === 0;

    let reports;

    if (isAdmin) {
      // If user is an admin, get all reports
      reports = await Report.find()
        .skip((page - 1) * count)
        .limit(Number(count));
    } else {
      // If projectId is not provided, get reports for all projects the user has access to
      if (!projectId) {
        const projectIds = user.projectIds || [];
        reports = await Report.find({ projectId: { $in: projectIds } })
          .skip((page - 1) * count)
          .limit(Number(count));
      } else {
        // Check if the user has access to the project
        const hasProjectId = user.projectIds.includes(projectId);
        if (!hasProjectId) {
          return res
            .status(403)
            .json({ message: "Access denied", status: false });
        }

        // Get reports for the specified project
        reports = await Report.find({ projectId })
          .skip((page - 1) * count)
          .limit(Number(count));
      }
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

const getAllReportsSearchByUserId = async (req, res) => {
  try {
    const { page = 1, count = 10, userId, search } = req.query;

    // Check if the userRole is 0 (Admin)
    const isAdmin = await User.exists({ _id: userId, userRole: 0 });

    let reports;
    let totalReports;

    if (isAdmin) {
      // If userRole is 0 (Admin), get all projects
      if (search) {
        reports = await Report.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        })
          .skip((page - 1) * count)
          .limit(Number(count));

        totalReports = await Report.countDocuments({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        });
      } else {
        reports = await Report.find({})
          .skip((page - 1) * count)
          .limit(Number(count));

        totalReports = await Report.countDocuments();
      }
    } else {
      // For other userRoles, filter projects by userId
      if (search) {
        reports = await Report.find({
          $and: [
            { usersIds: userId },
            {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
              ],
            },
          ],
        })
          .skip((page - 1) * count)
          .limit(Number(count));

        totalReports = await Report.countDocuments({
          $and: [
            { usersIds: userId },
            {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
              ],
            },
          ],
        });
      } else {
        reports = await Report.find({ usersIds: userId })
          .skip((page - 1) * count)
          .limit(Number(count));

        totalReports = await Report.countDocuments({ usersIds: userId });
      }
    }

    const totalPages = Math.ceil(totalReports / count);

    // Check if the requested page number is valid
    if (page > totalPages) {
      return res.status(404).json({
        message: "این صفحه وجود ندارد.",
        data: null,
        status: false,
      });
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

const getReportTotalPages = async (req, res) => {
  try {
    const { userId, projectId } = req.query;

    // Check if the userRole is 0 (Admin)
    const isAdmin = await User.exists({ _id: userId, userRole: 0 });

    let totalReports;

    if (isAdmin) {
      // If userRole is 0 (Admin), get all reports
      if (projectId != null) {
        totalReports = await Report.countDocuments({ projectId });
      } else {
        totalReports = await Report.countDocuments();
      }
    } else {
      if (projectId != null) {
        totalReports = await Report.countDocuments({
          usersIds: userId,
          projectId,
        });
      } else {
        totalReports = await Report.countDocuments({
          usersIds: userId,
        });
      }
    }
    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: totalReports, status: true });
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
    const { name, description, date, projectId, imageName, createdBy } =
      req.body;
    // Add the createdBy field to the report data
    const reportData = {
      name,
      description,
      date,
      imageName,
      projectId,
      createdBy,
    };

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(400)
        .json({ message: " پروژه ای یافت نشد.", data: null, status: false });
    }
    const report = await Report.create(reportData);
    project.reportsIds = [...project.reportsIds, report._id];
    await project.save();

    return res
      .status(201)
      .json({ message: "موفقیت آمیز", data: true, status: true });
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
      .json({ message: "موفقیت آمیز", data: true, status: true });
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
  getAllReportsSearchByUserId,
  getReportTotalPages,
  getReportById,
  addReport,
  updateReport,
  deleteReport,
};
