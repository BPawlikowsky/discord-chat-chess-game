const { checkIfMoveLegal } = require('./modules/checkIfMoveLegal');
const { getRegisteredPlayers } = require('./modules/getRegisteredPlayers');
const { getRound } = require('./modules/getRound');
const { getOptions } = require('./modules/getOptions');
const { registerPlayer } = require('./modules/registerPlayer');
const path = require('path');
const { absoluteToRelativePath } = require('./modules/absoluteToRelativePath');

module.exports = {
	getRegisteredPlayers: getRegisteredPlayers,
	registerPlayer: registerPlayer,
	getRound: getRound,
	checkIfMoveLegal: checkIfMoveLegal,
	getOptions: getOptions,
	absoluteToRelativePath: absoluteToRelativePath,
	constants: {
		W: '0',
		B: '1',
	},
	GAMES_LIST_PATH: path.posix.join(__dirname, 'gamesList.json'),
	GAMES_PATH: `${path.posix.join(__dirname, 'games')}`,
};