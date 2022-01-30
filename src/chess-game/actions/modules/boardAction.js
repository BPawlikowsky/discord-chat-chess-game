const { Chess } = require('chess.js');
const path = require('path');
const FTI = require('fen-to-image');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { titleMessage } = require('../../helpers/replyMessages');

const PATH = path.normalize(
	path.join(__dirname, '..', '..', '..', '..', 'board.png'),
);

const getCurrentBoard = async (gameObj, message, title, lastMove) => {
	try {
		await FTI({
			fen: gameObj.currentGameState,
			color: 'white',
			whiteCheck: false,
			blackCheck: false,
			lastMove: lastMove,
			dirsave: PATH,
		});
	}
	catch (err) {
		console.log(err);
	}

	const file = new MessageAttachment(path.resolve(__dirname, PATH.toString()));
	const embed = new MessageEmbed()
		.setTitle(title)
		.setImage('attachment://discordjs.png');
	return { content: message, embeds: [embed], files: [file] };
};

exports.boardAction = async (boardMessage, gameObj) => {
	const chess = new Chess(gameObj.currentGameState);
	const player = gameObj.players[gameObj.round.userIndex];
	let lastRound;
	if (gameObj.moves.length > 0) {
		lastRound = gameObj.moves[gameObj.round.roundNumber - 1];
	}
	else {
		lastRound = { from: 'a1', to: 'a1' };
	}
	const { from, to } = lastRound;
	const lastMove = `${from}${to}`;
	let title;
	if (chess.game_over()) {
		title = 'Game Over';
		gameObj.isGameOver = true;
	}
	else {
		title = titleMessage(player, chess.turn());
	}
	let message;
	if (lastMove === '') {
		message = await getCurrentBoard(gameObj, boardMessage, title, 'a1a1');
	}
	else {
		message = await getCurrentBoard(gameObj, boardMessage, title, lastMove);
	}
	return message;
};
