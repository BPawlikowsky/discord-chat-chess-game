const { readGameFile, saveGameFile } = require('../../gameFileHandler');

exports.registerPlayer = async (user, path) => {
	const gameObj = readGameFile(path);
	const playersArr = [...gameObj.players];
	playersArr.push(user);
	gameObj.players = playersArr;
	await saveGameFile(gameObj, path);
	console.log(`Player ${playersArr.length} registered: ${user}`);
};