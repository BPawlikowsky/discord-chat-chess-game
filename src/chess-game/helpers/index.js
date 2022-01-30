const { checkIfMoveLegal } = require('./modules/checkIfMoveLegal');
const { getRegisteredPlayers } = require('./modules/getRegisteredPlayers');
const { getOptions } = require('./modules/getOptions');
const { registerPlayer } = require('./modules/registerPlayer');
const { absoluteToRelativePath } = require('./modules/absoluteToRelativePath');

module.exports = {
	getRegisteredPlayers: getRegisteredPlayers,
	registerPlayer: registerPlayer,
	checkIfMoveLegal: checkIfMoveLegal,
	getOptions: getOptions,
	absoluteToRelativePath: absoluteToRelativePath,
	constants: {
		W: '0',
		B: '1',
	},
};