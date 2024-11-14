require('dotenv').config();
const mongoose = require("mongoose")
const mongoUri = process.env.MONGODB_URI;


const initializeDatabase = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to Database", error);
  }
};

module.exports = { initializeDatabase };
