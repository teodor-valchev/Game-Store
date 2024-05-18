const Game = require("../models/Game");

exports.createGame = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find({});

exports.getGame = (id) => Game.findById(id);

exports.editGame = (id, gameData) => Game.findByIdAndUpdate(id, gameData);

exports.deleteGame = (id) => Game.findByIdAndDelete(id);

exports.buyGame = async (gameId, userId) =>
    await Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });

exports.searchGame = async (text, platform) => {
    let games;
    const regex = new RegExp("^" + text, "i");

    if (!text && !platform) {
        return (games = Game.find({}).lean());
    }

    if (text) {
        return (games = Game.find({ name: regex }).lean());
    }

    if (platform) {
        return (games = Game.find({ platform }).lean());
    }
};
