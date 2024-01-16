const http = require("http");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { info } = require("./utils/logger");
const { MONGODB_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

mongoose.set("strictQuery", false);

info("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
