const { checkIfMoveLegal } = require('./modules/checkIfMoveLegal');
const { getRegisteredPlayers } = require('./modules/getRegisteredPlayers');
const { getRound } = require('./modules/getRound');
const { registerPlayer } = require('./modules/registerPlayer');

module.exports = {
	getRegisteredPlayers: getRegisteredPlayers,
	registerPlayer: registerPlayer,
	getRound: getRound,
	checkIfMoveLegal: checkIfMoveLegal,
	constants: {
		W: '0',
		B: '1',
	},
};