const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required!"],
    },
    email: {
        type: String,
        required: [true, "Email required!"],
    },
    password: {
        type: String,
        required: [true, "Password required!"],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
