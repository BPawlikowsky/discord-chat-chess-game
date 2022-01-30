const { createWriteFile } = require('./createWriteFile');

exports.saveGameFile = (gameObj, path) => {
	const data = JSON.stringify(gameObj);
	createWriteFile(data, path);
};
