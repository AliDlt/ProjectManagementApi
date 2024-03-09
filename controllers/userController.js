const User = require("../models/userModel");

const getAllUsersByPagination = async (req, res) => {
  try {
    const { page = 1, count = 10, userRole } = req.query;

    const users = await User.find({ userRole })
      .skip((page - 1) * count)
      .limit(Number(count));

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: users, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const getUserById = async (req, res) => {
  try {
    const { Id } = req.query;

    const user = await User.findById(Id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "کاربری یافت نشد.", data: null, status: false });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: user, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res
      .status(201)
      .json({ message: "موفقیت آمیز", data: user, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const { Id } = req.query;

    const updatedUser = await User.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "کاربری یافت نشد.", data: null, status: false });
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

const deleteUser = async (req, res) => {
  try {
    const { Id } = req.query;

    const deletedUser = await User.findByIdAndDelete(Id);

    if (!deletedUser) {
      return res
        .status(400)
        .json({ message: "کاربری یافت نشد.", data: null, status: false });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: deletedUser, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

module.exports = {
  getAllUsersByPagination,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
