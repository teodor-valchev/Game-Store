const util = require("util");
const jsonWebtoken = require("jsonwebtoken");

const jwt = {
    sign: util.promisify(jsonWebtoken.sign),
    verify: util.promisify(jsonWebtoken.verify),
};

module.exports = jwt;
