const { readGameFile, saveGameFile } = require('../../gameFileHandler');

exports.registerPlayer = (user, path) => {
	const gameObj = readGameFile(path);
	const playersArr = [...gameObj.players];
	playersArr.push(user);
	gameObj.players = playersArr;
	saveGameFile(gameObj, path);
	console.log(`Player ${playersArr.length} registered: ${user}`);
};