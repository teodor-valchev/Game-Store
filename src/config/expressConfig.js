const express = require("express");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
    app.use(express.static("src/public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser())
};
