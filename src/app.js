const express = require("express");
const router = require("./router");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const PORT = require("./constants");

const app = express();

handlebarsConfig(app);
expressConfig(app)

app.use(router)

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));
