const express = require("express");
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

const app = express.Router();

const advancedResults = require("../middleware/advancedResults");
//Include other resources routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");
const { protect, authorize } = require("../middleware/auth");

app.use("/:bootcampId/courses", courseRouter);
app.use("/:bootcampId/reviews", reviewRouter);
app.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
app
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);
app
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);
app
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = app;
