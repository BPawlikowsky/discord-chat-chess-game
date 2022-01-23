const { isGameFile } = require('./modules/isGameFile');
const { createGameFile } = require('./modules/createGameFile');
const { readGameFile } = require('./modules/readGameFile');
const { saveGameFile } = require('./modules/saveGameFile');

const PATH = 'src/game.json';


module.exports = {
	isGameFile: isGameFile,
	createGameFile: createGameFile,
	readGameFile: readGameFile,
	saveGameFile: saveGameFile,
};