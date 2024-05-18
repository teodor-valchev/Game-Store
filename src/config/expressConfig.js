const express = require("express");

module.exports = (app) => {
    app.use(express.static("src/public"));
    app.use(express.urlencoded({ extended: false }));
};
