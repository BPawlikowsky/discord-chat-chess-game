const { createGameFile } = require('./gameFileHandler');
const { getOptions } = require('./helpers/getOptions');
const { startAction } = require('./modules/startAction');
const { moveAction } = require('./modules/moveAction');
const { boardAction } = require('./modules/boardAction');

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
		const message = await startAction(user.username);
		await interaction.reply(message);
	} break;
	case 'move': {
		const embeddedMessage = await moveAction(user.username, moveFrom, moveTo);
		await interaction.reply(embeddedMessage);
	} break;
	case 'reset': {
		await createGameFile();
		await interaction.reply('Game file has been reset.');
	} break;
	case 'board': {
		const boardMessage = 'Current board view';
		const message = await boardAction(moveFrom, moveTo, boardMessage);
		await interaction.reply(message);
	} break;
	}
};