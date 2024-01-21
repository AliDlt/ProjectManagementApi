const axios = require("axios");

const send = async (req, res) => {
  try {
    const { PhoneNumber } = req.query;

    const apiUrl = "http://api.mrapi.ir/sandbox/send";
    const requestData = {
      PhoneNumber: PhoneNumber,
      PatternID: "631b5dfe-a39e-400d-a17c-f3b2fae8aafa",
      Token: "QmVOb2JhdGFIUjBjRG92TDJKbGFHNXZZbUYwTG1seUx3PT0=",
      ProjectType: 1,
    };

    const headers = {
      Authentication:
        "5gTYiBjM0UGZjFTYhFmYldjM2QzNmFGZlVWOlljZ1QjOEJDRBJ0QGJjM",
      "Content-Type": "application/json",
    };

    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        if (response.data.IsSuccess) {
          return res.status(200).json({
            message: response.data.Message,
            data: response.data.Data,
            status: true,
          });
        } else {
          return res.status(400).json({
            message: response.data.Message,
            data: response.data.Data,
            status: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        return res.status(500).json({
          message: `خطا : ${error.message}`,
          data: null,
          status: false,
        });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const verify = async (req, res) => {
  try {
    const { PhoneNumber, Code } = req.query;
    const apiUrl = "http://api.mrapi.ir/sandbox/verify";
    const requestData = {
      PhoneNumber: PhoneNumber,
      Code: Code,
    };

    const headers = {
      Authentication:
        "5gTYiBjM0UGZjFTYhFmYldjM2QzNmFGZlVWOlljZ1QjOEJDRBJ0QGJjM",
      "Content-Type": "application/json",
    };

    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        if (response.data.IsSuccess) {
          return res.status(200).json({
            message: response.data.Message,
            data: response.data.Data,
            status: true,
          });
        } else {
          return res.status(400).json({
            message: response.data.Message,
            data: response.data.Data,
            status: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        return res.status(500).json({
          message: `خطا : ${error.message}`,
          data: null,
          status: false,
        });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

module.exports = {
  send,
  verify,
};
