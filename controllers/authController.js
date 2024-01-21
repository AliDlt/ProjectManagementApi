const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      if (user.active) {
        if (password === user.password) {
          return res
            .status(200)
            .json({ data: user, message: "موفقیت آمیز", status: true });
        } else {
          return res.status(400).json({
            data: null,
            message: "نام کاربری یا رمزعبور شما اشتباه است.",
            status: false,
          });
        }
      } else {
        return res.status(400).json({
          data: null,
          message: "حساب شما فعال نمی باشد.لطفا با مدیر تماس بگیرید.",
          status: false,
        });
      }
    } else {
      return res.status(400).json({
        data: null,
        message: "کاربری یافت نشد.",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `خطا : ${error.message}`, status: false });
  }
};

const register = async (req, res) => {
  try {
    const { name, phonenumber, nationalCode, username, password, userRole } =
      req.body;

    const existingUserWithUsername = await User.findOne({ username });
    const existingUserWithPhoneNumber = await User.findOne({
      phonenumber: phonenumber,
    });

    if (existingUserWithUsername) {
      return res.status(400).json({
        data: null,
        message:
          "نام کاربری تکراری می باشد، لطفا نام کاربری دیگری را امتحان کنید.",
        status: false,
      });
    } else if (existingUserWithPhoneNumber) {
      return res.status(400).json({
        data: null,
        message: "شما قبلا با این شماره همراه ثبت نام کرده اید.",
        status: false,
      });
    } else {
      const user = await User.create({
        name,
        phonenumber,
        nationalCode,
        username,
        password,
        userRole,
      });

      if (user) {
        return res.status(201).json({
          data: user,
          message: "ثبت نام با موفقیت انجام شد.",
          status: true,
        });
      } else {
        return res.status(400).json({
          data: null,
          message: "ثبت نام با خطا مواجه شد.",
          status: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `خطا : ${error.message}`, status: false });
  }
};

const checkRegister = async (req, res) => {
  try {
    const { username, phonenumber, nationalCode } = req.body;
    const existingUserWithUsername = await User.findOne({ username });
    const existingUserWithPhoneNumber = await User.findOne({
      phonenumber: phonenumber,
    });
    const existingUserWithNationalCode = await User.findOne({
      nationalCode: nationalCode,
    });
    if (existingUserWithUsername) {
      return res.status(400).json({
        data: null,
        message:
          "نام کاربری تکراری می باشد، لطفا نام کاربری دیگری را امتحان کنید.",
        status: false,
      });
    } else if (existingUserWithPhoneNumber) {
      return res.status(400).json({
        data: null,
        message:
          "شماره همراه تکراری می باشد، لطفا شماره همراه دیگری را امتحان کنید.",
        status: false,
      });
    } else if (existingUserWithNationalCode) {
      return res.status(400).json({
        data: null,
        message: "شما قبلا با این کدملی ثبت نام کرده اید.",
        status: false,
      });
    } else {
      return res.status(200).json({
        data: null,
        message: "ثبت نام قابل انجام می باشد.",
        status: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `خطا : ${error.message}`, status: false });
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, password } = req.query;

    const user = await User.findOne({ username });

    if (user) {
      user.password = password;
      await user.save();
      return res.status(200).json({
        data: user,
        message: "پسورد با موفقیت تغییر پیدا کرد.",
        status: true,
      });
    } else {
      return res
        .status(400)
        .json({ data: null, message: "کاربر یافت نشد.", status: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      message: `خطا : ${error.message}`,
      status: false,
    });
  }
};

const getUserByPhoneNumber = async (req, res) => {
  try {
    const { phonenumber } = req.body;

    // Check if the user exists in the User collection
    const user = await User.findOne({ phonenumber: phonenumber });

    if (user) {
      if (user.active) {
        return res
          .status(200)
          .json({ data: user, message: "کاربر یافت شد.", status: true });
      } else {
        return res.status(400).json({
          data: null,
          message: "حساب شما فعال نمی باشد. لطفا با مدیر تماس بگیرید.",
          status: false,
        });
      }
    } else {
      return res.status(400).json({
        data: null,
        message: "کاربری با این شماره همراه یافت نشد.",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: null, message: `خطا : ${error.message}`, status: false });
  }
};

module.exports = {
  login,
  register,
  checkRegister,
  changePassword,
  getUserByPhoneNumber,
};
