const User = require("../models/userModel");

const getAllUsersByPagination = async (req, res) => {
  try {
    const { page, count } = req.params;

    const users = await User.find()
      .skip((page - 1) * count)
      .limit(Number(count));

    return res.status(200).json({ message: "موفقیت آمیز", data: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const getUserById = async (req, res) => {
  try {
    const { Id } = req.params;

    const user = await User.findById(Id);

    if (!user) {
      return res.status(404).json({ message: "کاربری یافت نشد.", data: null });
    }

    return res.status(200).json({ message: "موفقیت آمیز", data: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({ message: "موفقیت آمیز", data: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const updateUser = async (req, res) => {
  try {
    const { Id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "کاربری یافت نشد.", data: null });
    }

    return res.status(200).json({ message: "موفقیت آمیز", data: updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { Id } = req.params;

    const deletedUser = await User.findByIdAndDelete(Id);

    if (!deletedUser) {
      return res.status(404).json({ message: "کاربری یافت نشد.", data: null });
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
  getAllUsersByPagination,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
