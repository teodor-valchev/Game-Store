const { extractErrorMessages } = require("../helpers/errorHandler");
const { isAuth } = require("../middlewares/authMiddleware");
const {
    createGame,
    getAll,
    getGame,
    editGame,
    deleteGame,
    buyGame,
    searchGame,
} = require("../services/gameService");

const router = require("express").Router();

router.get("/catalog", async (req, res) => {
    const games = await getAll().lean();
    res.render("game/catalog", { games });
});

router.get("/create", isAuth, (req, res) => {
    res.render("game/create");
});

router.post("/create", isAuth, async (req, res) => {
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
    try {
        await createGame(gameData);
        res.redirect("/games/catalog");
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.render("game/create", { errorMessages });
    }
});

router.get("/details/:gameId", async (req, res) => {
    const gameId = req.params.gameId;
    const game = await getGame(gameId).lean();
    const isOwner = req.user?._id === game.owner.toString();
    const isBoughtGame = game.boughtBy.some((game) =>
        game.toString().includes(req.user?._id)
    );
    const isGuest = req.user !== undefined;

    res.render("game/details", { game, isOwner, isBoughtGame, isGuest });
});

router.get("/edit/:gameId", isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const game = await getGame(gameId).lean();

    res.render("game/edit", { game });
});

router.post("/edit/:gameId", isAuth, async (req, res) => {
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
    try {
        await editGame(gameId, gameData);

        res.redirect(`/games/details/${gameId}`);
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.render("game/edit", { errorMessages });
    }
});

router.get("/delete/:gameId", isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    await deleteGame(gameId);

    res.redirect("/games/catalog");
});

router.get("/buy/:gameId", isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const user = req.user._id;

    await buyGame(gameId, user);

    res.redirect(`/games/details/${gameId}`);
});

router.get("/search", isAuth, async (req, res) => {
    const { text, platform } = req.query;
    const games = await searchGame(text, platform);
    res.render("game/search", { games });
});

module.exports = router;
