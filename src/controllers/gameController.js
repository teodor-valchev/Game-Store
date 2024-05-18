const { createGame, getAll, getGame } = require("../services/gameService");

const router = require("express").Router();

router.get("/catalog", async (req, res) => {
    const games = await getAll().lean();
    res.render("game/catalog", { games });
});

router.get("/create", (req, res) => {
    res.render("game/create");
});

router.post("/create", async (req, res) => {
    const { platform, name, image, price, genre, description } = req.body;
    const gameData = {
        platform,
        name,
        image,
        price,
        genre,
        description,
        owner: req.user._id,
    };
    await createGame(gameData);
    res.redirect("/games/catalog");
});

router.get("/details/:gameId", async (req, res) => {
    const gameId = req.params.gameId;
    const game = await getGame(gameId).lean();

    res.render("game/details", { game });
});

module.exports = router;
