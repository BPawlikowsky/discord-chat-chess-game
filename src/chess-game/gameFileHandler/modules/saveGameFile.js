const { createWriteFile } = require('./createWriteFile');

exports.saveGameFile = async (gameObj) => {
	const data = JSON.stringify(gameObj);
	await createWriteFile(data);
};
