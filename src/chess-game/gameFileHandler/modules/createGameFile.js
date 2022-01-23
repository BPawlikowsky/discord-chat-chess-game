const { createWriteFile } = require("./createWriteFile");
const gamePrototype = require('../../helpers/gameObjectPrototype');

exports.createGameFile = async () => {
	const data = JSON.stringify(gamePrototype);
	await createWriteFile(data);
};
