const { readGameFile } = require('../../gameFileHandler');

exports.getRegisteredPlayers = (path) => {
	const gameObj = readGameFile(path);
	if (gameObj) return gameObj.players;
	return [];
};