const express = require("express");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const PORT = require("./constants");

const app = express();

handlebarsConfig(app);
expressConfig(app)

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));
