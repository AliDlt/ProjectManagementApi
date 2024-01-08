const Admin = require("../models/adminModel");

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "-__v");
    if (!admins || admins.length === 0) {
      return res
        .status(404)
        .json({ data: null, message: "مدیر وجود ندارد." });
    }
    return res.status(200).json({ data: admins, message: "موفقیت آمیز" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: null, message: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findById(id, "-__v");
    if (!admin) {
      return res.status(404).json({ data: null, message: "مدیر وجود ندارد." });
    }
    return res.status(200).json({ data: admin, message: "موفقیت آمیز" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: null, message: error.message });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name, phonenumber, username, password } = req.body;
    const admin = await Admin.create({ name, phonenumber, username, password });
    return res.status(201).json({ data: admin, message: "موفقیت آمیز" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: null, message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phonenumber, username, password } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      id,
      { name, phonenumber, username, password },
      { new: true }
    );
    if (!admin) {
      return res
        .status(404)
        .json({ data: null, message: "آپدیت مدیر با خطا مواجه شد." });
    }
    return res.status(200).json({ data: admin, message: "موفقیت آمیز" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: null, message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res
        .status(404)
        .json({ data: null, message: "حذف مدیر با خطا مواجه شد." });
    }
    return res.status(200).json({ data: admin, message: "موفقیت آمیز" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: null, message: error.message });
  }
};

module.exports = {
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
