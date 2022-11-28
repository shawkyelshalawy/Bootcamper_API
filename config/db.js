const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) throw err;
    console.log("connected to MongoDB".cyan.underline.bold);
  });

  //console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
