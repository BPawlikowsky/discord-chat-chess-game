const { boardAction } = require('./modules/boardAction');
const { moveAction } = require('./modules/moveAction');
const { startAction } = require('./modules/startAction');

module.exports = {
	startAction: startAction,
	moveAction: moveAction,
	boardAction: boardAction,
};