const { readGameFile } = require("../../gameFileHandler");

exports.getRegisteredPlayers = () => {
    const gameObj = readGameFile();
    if (gameObj) return gameObj.players;
    return [];
};