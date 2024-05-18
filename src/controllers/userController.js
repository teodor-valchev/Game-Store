const { register } = require("../services/userService");

const router = require("express").Router();

router.get("/register", (req, res) => {
    res.render("user/register");
});

router.get("/login", (req, res) => {
    res.render("user/login");
});

router.post("/register", async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    const userData = {
        username,
        email,
        password,
        repeatPassword,
    };

    await register(userData)

    res.redirect("/");
});

module.exports = router;
