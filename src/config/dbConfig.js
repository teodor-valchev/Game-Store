const mongoose = require("mongoose");
const { uri } = require("../constants");

async function dbConfig() {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to DB!");
    } catch (err) {
        console.error(err);
    }
}

module.exports = dbConfig;
