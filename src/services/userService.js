const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const { SECRET } = require("../constants");

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User or password is incorrect!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("User or password is incorrect!");
    }

    const paylaod = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(paylaod, SECRET, { expiresIn: "2d" });

    return token;
};
