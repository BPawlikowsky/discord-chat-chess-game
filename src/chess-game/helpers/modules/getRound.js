const { readGameFile } = require("../../gameFileHandler");

exports.getRound = () => {
    const gameObj = readGameFile();
    return gameObj.round;
};