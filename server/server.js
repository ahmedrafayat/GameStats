const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "./server/config.env" });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"]
    // ,credentials: true
  })
);
app.options("*", cors());

const DB_URL = "mongodb://localhost:27017/gamestats";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
require("./config/database");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/profile", require("./config/routes/profile"));
app.use(require("./config/routes/comment"));

const port = process.env.PORT || 8000;

app.listen(port, err => {
  if (err) {
    process.exit(1);
  }
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});
