const { extractErrorMessages } = require("../helpers/errorHandler");
const { register, login } = require("../services/userService");

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
    try {
        await register(userData);

        res.redirect("/users/login");
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.render("user/register", { errorMessages });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.render("user/login", { errorMessages });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

module.exports = router;
