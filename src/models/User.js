const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required!"],
        minLength: [5, "Username should be at least 5 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email required!"],
        minLength: [10, "Email should be at least 10 characters long"],
    },
    password: {
        type: String,
        required: [true, "Password required!"],
        minLength: [4, "Password should be at least 4 characters long"],
    },
});

userSchema.virtual("repeatPassword").set(function (repeatPassword) {
    if (this.password !== repeatPassword) {
        throw new Error("Passwords mismatch");
    }
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
