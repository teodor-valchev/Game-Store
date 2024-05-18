const Game = require("../models/Game");

exports.createGame = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find({});

exports.getGame = (id) => Game.findById(id);

exports.editGame = (id, gameData) => Game.findByIdAndUpdate(id, gameData);

exports.deleteGame = (id) => Game.findByIdAndDelete(id)
