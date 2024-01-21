const Report = require("../models/reportModel");

const getAllReportsByPagination = async (req, res) => {
  try {
    const { page, count } = req.query;

    const reports = await Report.find()
      .skip((page - 1) * count)
      .limit(Number(count));

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

const getAllReportsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    const reports = await Report.find({ userId });

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
  getAllReportsByPagination,
  getAllReportsByUserId,
  getReportById,
  addReport,
  updateReport,
  deleteReport,
};
