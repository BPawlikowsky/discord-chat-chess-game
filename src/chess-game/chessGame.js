const { createGameFile, readGameFile } = require('./gameFileHandler');
const { getCurrentBoard } = require('./gameHandler');
const { getOptions } = require('./helpers/getOptions');
const { movePiece } = require('./movePiece');
const { startGame } = require('./startGame');
const path = require('path');
const { Chess } = require('chess.js');

const PATH = path.join('src', 'board.png');

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
		await interaction.reply(message);
	} break;
	case 'move': {
		const moveMessage = await movePiece(user.username, moveFrom, moveTo);
		const gameObj = await readGameFile();
		const chess = new Chess(gameObj.currentGameState);
		const player = gameObj.players[gameObj.round.userIndex];
		const lastMove = `${moveFrom}${moveTo}`;
		const title = `Current player: ${player} color: ${chess.turn()}`;
		const embeddedMessage = await getCurrentBoard(gameObj, moveMessage, title, lastMove, PATH);
		await interaction.reply(embeddedMessage);
	} break;
	case 'reset': {
		await createGameFile();
		await interaction.reply('Game file has been reset.');
	} break;
	case 'board': {
		const gameObj = await readGameFile();
		const chess = new Chess(gameObj.currentGameState);
		const player = gameObj.players[gameObj.round.userIndex];
		const lastMove = `${moveFrom}${moveTo}`;
		const title = `Current player: ${player} color: ${chess.turn()}`;
		if (!lastMove) {
			const message = await getCurrentBoard(gameObj, 'Current board view', title, 'a2a3', PATH);
			await interaction.reply(message);
		}
		else {
			const message = await getCurrentBoard(gameObj, 'Current board view', title, lastMove, PATH);
			await interaction.reply(message);
		}
	} break;
	}
};