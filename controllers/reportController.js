const Report = require("../models/reportModel");

const getAllReportsByPagination = async (req, res) => {
  try {
    const { page, count } = req.params;

    const reports = await Report.find()
      .skip((page - 1) * count)
      .limit(Number(count));

    return res.status(200).json({ message: "موفقیت آمیز", data: reports });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const getAllReportsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const reports = await Report.find({ userId });

    return res.status(200).json({ message: "موفقیت آمیز", data: reports });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const getReportById = async (req, res) => {
  try {
    const { Id } = req.params;

    const report = await Report.findById(Id);

    if (!report) {
      return res.status(404).json({ message: "گزارشی یافت نشد.", data: null });
    }

    return res.status(200).json({ message: "موفقیت آمیز", data: report });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const addReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);

    return res.status(201).json({ message: "موفقیت آمیز", data: report });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const updateReport = async (req, res) => {
  try {
    const { Id } = req.params;

    const updatedReport = await Report.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    if (!updatedReport) {
      return res.status(404).json({ message: "گزارشی یافت نشد.", data: null });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: updatedReport });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { Id } = req.params;

    const deletedReport = await Report.findByIdAndDelete(Id);

    if (!deletedReport) {
      return res.status(404).json({ message: "گزارشی یافت نشد.", data: null });
    }

    return res.status(200).json({ message: "موفقیت آمیز", data: null });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
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
