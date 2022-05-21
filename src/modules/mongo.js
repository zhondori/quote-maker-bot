const mongoose = require("mongoose");
const { DB_URL } = require("../../config");

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.log("MongoDB connection failed", err);
    }
}