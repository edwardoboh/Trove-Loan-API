require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const swagger = require("swagger-ui-express");
const cors = require("cors");
const docs = require("./docs");

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const DB_URL =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_DB_LOCAL
    : process.env.NODE_ENV === "test"
    ? process.env.MONGO_DB_TEST
    : process.env.MONGO_DB_LIVE;

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connection to DB was successful");
  }
);

app.use("/api/v1", require("./routes"));
app.use("/docs", swagger.serve, swagger.setup(docs));
if (process.env.NODE_ENV != "test" && process.env.NODE_ENV != "development") {
  app.get("*", (req, res) => {
    res.redirect(302, "/docs");
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port: `, PORT));

module.exports = app;
