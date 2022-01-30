const { createWriteFile } = require('./createWriteFile');
const gamePrototype = require('../../helpers/gameObjectPrototype');

exports.createGameFile = async (path) => {
	console.log(path);
	const data = JSON.stringify(gamePrototype);
	await createWriteFile(data, path);
};
