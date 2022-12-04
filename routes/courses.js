const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const { Course } = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");
const app = express.Router({ mergeParams: true });

app
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(addCourse);
app.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = app;
