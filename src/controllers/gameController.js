const {
    createGame,
    getAll,
    getGame,
    editGame,
    deleteGame,
} = require("../services/gameService");

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
    const isOwner = req.user?._id === game.owner.toString();

    res.render("game/details", { game, isOwner });
});

router.get("/edit/:gameId", async (req, res) => {
    const gameId = req.params.gameId;
    const game = await getGame(gameId).lean();

    res.render("game/edit", { game });
});

router.post("/edit/:gameId", async (req, res) => {
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
    const gameId = req.params.gameId;

    await editGame(gameId, gameData);

    res.redirect(`/games/details/${gameId}`);
});

router.get("/delete/:gameId", async (req, res) => {
    const gameId = req.params.gameId;

    await deleteGame(gameId);

    res.redirect("/games/catalog");
});

module.exports = router;
