const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
//load env variables
dotenv.config({ path: "./config/.env" });

//connect to database

connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File Uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));
//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
//Body parser

app.use(express.json());

//Mount routes

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
