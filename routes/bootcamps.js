const express = require("express");
const app = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");
app.route("/").get(getBootcamps).post(createBootcamp);
app.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

module.exports = app;
