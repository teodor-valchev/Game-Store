const express = require("express");
const PORT = require("./constants");

const app = express();

app.get("/", (req, res) => {
    res.send("New project");
});

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));