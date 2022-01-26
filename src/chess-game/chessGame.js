const {
	createGameFile,
	readGameFile,
	saveGameFile,
} = require('./gameFileHandler');
const { getOptions } = require('./helpers/modules/getOptions');
const { startAction, moveAction, boardAction } = require('./actions/index');

exports.chessGame = async (interaction) => {
	const { options, user } = interaction;
	const optionsAsString = await options.getString('input');
	const optionsAsArray = [];

	if (optionsAsString) {
		getOptions(optionsAsString).forEach((el) => optionsAsArray.push(el));
	}
	const [selectedOption, moveFrom, moveTo] = optionsAsArray;

	switch (selectedOption) {
		case 'start':
			{
				const message = await startAction(user.username);
				await interaction.reply(message);
			}
			break;
		case 'move':
			{
				const gameObj = readGameFile();
				const moveMessage = moveAction(
					user.username,
					moveFrom,
					moveTo,
					gameObj
				);
				const embeddedMessage = await boardAction(
					moveMessage,
					gameObj
				);
				await interaction.reply(embeddedMessage);
				await saveGameFile(gameObj);
			}
			break;
		case 'reset':
			{
				await createGameFile();
				await interaction.reply('Game file has been reset.');
			}
			break;
		case 'board':
			{
				const gameObj = readGameFile();
				const boardMessage = 'Current board view';
				const message = await boardAction(boardMessage, gameObj);
				await interaction.reply(message);
			}
			break;
		default:
			{
				await interaction.reply(
					'Could not identify command, please try again.'
				);
			}
			break;
	}
};
