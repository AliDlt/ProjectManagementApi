const Admin = require("../models/adminModel");
const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    const user = await User.findOne({ username });
    if (user) {
      if (user.active) {
        if (await bcrypt.compare(password, user.password)) {
          return res.status(200).json({ data: user, message: "موفقیت آمیز" });
        } else {
          return res.status(400).json({
            data: null,
            message: "نام کاربری یا رمزعبور شما اشتباه است.",
          });
        }
      } else {
        return res.status(400).json({
          data: null,
          message: "حساب شما فعال نمی باشد.لطفا با مدیر تماس بگیرید.",
        });
      }
    } else if (admin != null) {
      if (admin.active) {
        if (await bcrypt.compare(password, admin.password)) {
          return res.status(200).json({ data: admin, message: "موفقیت آمیز" });
        } else {
          return res.status(400).json({
            data: null,
            message: "نام کاربری یا رمزعبور شما اشتباه است.",
          });
        }
      } else {
        return res.status(400).json({
          data: null,
          message: "حساب شما فعال نمی باشد.لطفا با مدیر تماس بگیرید.",
        });
      }
    } else {
      return res.status(400).json({
        data: null,
        message: "نام کاربری یا رمزعبور شما اشتباه است.",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `خطا : ${error.message}` });
  }
};

const register = async (req, res) => {
  try {
    const existingUserWithUsername = await User.findOne({ username });
    const existingAdminWithUsername = await Admin.findOne({ username });
    const existingUserWithPhoneNumber = await User.findOne({
      phonenumber: phoneNumber,
    });
    const existingAdminWithPhoneNumber = await Admin.findOne({
      phonenumber: phoneNumber,
    });

    if (existingUserWithUsername || existingAdminWithUsername) {
      return res.status(400).json({
        data: false,
        message:
          "نام کاربری تکراری می باشد، لطفا نام کاربری دیگری را امتحان کنید.",
      });
    } else if (existingUserWithPhoneNumber || existingAdminWithPhoneNumber) {
      return res.status(400).json({
        data: false,
        message: "شما قبلا با این شماره همراه ثبت نام کرده اید.",
      });
    } else {
      const {
        name,
        phonenumber,
        nationalCode,
        username,
        password,
        userRole,
        projectIds,
      } = req.body;

      const user = await User.create({
        name,
        phonenumber,
        nationalCode,
        username,
        password,
        userRole,
        projectIds,
      });

      if (user) {
        return res
          .status(201)
          .json({ data: true, message: "ثبت نام با موفقیت انجام شد." });
      } else {
        return res
          .status(400)
          .json({ data: false, message: "ثبت نام با خطا مواجه شد." });
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: false, message: `خطا : ${error.message}` });
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const admin = await Admin.findOne({ username });

    if (user) {
      user.password = password;
      await user.save();
      return res
        .status(200)
        .json({ data: true, message: "پسورد با موفقیت تغییر پیدا کرد." });
    } else if (admin) {
      admin.password = password;
      await admin.save();
      return res
        .status(200)
        .json({ data: true, message: "پسورد با موفقیت تغییر پیدا کرد." });
    } else {
      return res.status(404).json({ data: false, message: "کاربر یافت نشد." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: false,
      message: `خطا : ${error.message}`,
    });
  }
};

const checkphoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if the user exists in the User collection
    const user = await User.findOne({ phonenumber: phoneNumber });

    // Check if the admin exists in the Admin collection
    const admin = await Admin.findOne({ phonenumber: phoneNumber });

    if (user) {
      if (user.active) {
        return res.status(200).json({ data: user, message: "کاربر یافت شد." });
      } else {
        return res.status(400).json({
          data: null,
          message: "حساب شما فعال نمی باشد. لطفا با مدیر تماس بگیرید.",
        });
      }
    } else if (admin) {
      if (admin.active) {
        return res.status(200).json({ data: admin, message: "کاربر یافت شد." });
      } else {
        return res.status(400).json({
          data: null,
          message: "حساب شما فعال نمی باشد. لطفا با مدیر تماس بگیرید.",
        });
      }
    } else {
      return res
        .status(404)
        .json({ data: null, message: "کاربری با این شماره همراه یافت نشد." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `خطا : ${error.message}` });
  }
};

module.exports = {
  login,
  register,
  changePassword,
  checkphoneNumber,
};
