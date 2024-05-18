const Game = require("../models/Game");

exports.createGame = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find({});
