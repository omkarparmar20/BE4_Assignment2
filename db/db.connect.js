require('dotenv').config()
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB

console.log("Mongo URI:", mongoUri);
const initializeDatabase = async() => {
    await mongoose.connect(mongoUri).then(() => {
        console.log("Connected to Database");
    }).catch((error) => console.log("Error connecting to Database", error))
};

module.exports = {initializeDatabase}
 