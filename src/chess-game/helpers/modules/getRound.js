const { readGameFile } = require('../../gameFileHandler');

exports.getRound = (path) => {
	const gameObj = readGameFile(path);
	return gameObj.round;
};