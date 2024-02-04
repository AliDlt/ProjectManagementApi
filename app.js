const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const db = require("./configs/db");

require("dotenv").config();

const port = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

app.use(helmet());

//* Database connection
db.connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//* BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(require("./routes/userRoutes"));
app.use(require("./routes/appSettingsRoutes"));
app.use(require("./routes/smsRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/imageRoutes"));
app.use(require("./routes/projectRoutes"));
app.use(require("./routes/reportRoutes"));

// Handle 404
app.get("*", function (req, res) {
  res.status(404).json("Route Not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
