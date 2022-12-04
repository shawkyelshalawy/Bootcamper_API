const express = require("express");
const app = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const { Bootcamp } = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
//Include other resources routers
const courseRouter = require("./courses");
app.use("/:bootcampId/courses", courseRouter);
app.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
app
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(createBootcamp);
app.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);
app.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = app;
