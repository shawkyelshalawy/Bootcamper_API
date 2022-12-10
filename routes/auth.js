const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

const app = express.Router();

const { protect } = require("../middleware/auth");

app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);
app.get("/me", protect, getMe);
app.put("/updatedetails", protect, updateDetails);
app.put("/updatepassword", protect, updatePassword);
app.post("/forgotpassword", forgotPassword);
app.put("/resetpassword/:resettoken", resetPassword);

module.exports = app;
