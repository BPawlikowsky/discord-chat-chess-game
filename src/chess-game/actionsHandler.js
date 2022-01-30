const {
	readGameFile,
	saveGameFile,
} = require('./gameFileHandler');
const { startAction, moveAction, boardAction } = require('./actions/index');

exports.actionsHandler = async (optionsAsArray, user, gamePath) => {
	const [selectedOption, moveFrom, moveTo] = optionsAsArray;

	switch (selectedOption) {
	case 'start':
	{
		const message = await startAction(user.username, gamePath);
		return message;
	}
	case 'move':
	{
		const gameObj = readGameFile(gamePath);
		const moveMessage = moveAction(
			user.username,
			moveFrom,
			moveTo,
			gameObj,
		);
		await saveGameFile(gameObj, gamePath);
		const embeddedMessage = await boardAction(moveMessage, gameObj);
		return embeddedMessage;
	}
	case 'board':
	{
		const gameObj = readGameFile(gamePath);
		const boardMessage = 'Current board view';
		const message = await boardAction(boardMessage, gameObj);
		return message;
	}
	default:
	{
		return 'Could not identify command, please try again.';
	}
	}
};
