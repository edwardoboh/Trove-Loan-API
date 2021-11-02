require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use((req, res, next) => {
  next();
});

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port: `, PORT));

module.exports = app;
