const { createWriteFile } = require('./createWriteFile');

exports.saveGameFile = async (gameObj, path) => {
	const data = JSON.stringify(gameObj);
	await createWriteFile(data, path);
};
