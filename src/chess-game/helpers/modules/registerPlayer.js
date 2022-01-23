const { readGameFile, saveGameFile } = require("../../gameFileHandler");

exports.registerPlayer = async (user) => {
    const gameObj = readGameFile();
    const playersArr = [...gameObj.players];
    playersArr.push(user);
    gameObj.players = playersArr;
    await saveGameFile(gameObj);
    console.log(`Player ${playersArr.length} registered: ${user}`);
};