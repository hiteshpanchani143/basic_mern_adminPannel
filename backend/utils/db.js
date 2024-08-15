const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongodb connection successfully");
  } catch (error) {
    console.log("mongodb connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
