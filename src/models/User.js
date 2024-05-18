const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
