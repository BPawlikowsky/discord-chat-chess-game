const { createGameFile } = require('./gameFileHandler');
const { getCurrentBoard } = require('./gameHandler');
const { getOptions } = require('./getOptions');
const { movePiece } = require('./movePiece');
const { startGame } = require('./startGame');

exports.chessGame = async (interaction) => {
	const { options, user } = interaction;
	const optionsAsString = await options.getString('input');
	const optionsAsArray = [];
	if (optionsAsString) {
		getOptions(optionsAsString)
			.forEach((el) => optionsAsArray.push(el));
	}
	const [ selectedOption, moveFrom, moveTo ] = optionsAsArray;
	switch (selectedOption) {
	case 'start': {
		const message = await startGame(user.username);
		interaction.reply(message);
	} break;
	case 'move': {
		const mesaage = await movePiece(user.username, moveFrom, moveTo);
		interaction.reply(mesaage);
	} break;
	case 'reset': {
		createGameFile();
		interaction.reply('Game file has been reset.');
	} break;
	case 'board': {
		const message = await getCurrentBoard();
		interaction.reply(message);
	} break;
	}
};