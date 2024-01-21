const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  }

  const userToken = tokenParts[1];

  jwt.verify(userToken, secretKey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token expired" });
      } else {
        return res.status(403).json({ message: "Forbidden - Invalid token" });
      }
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
