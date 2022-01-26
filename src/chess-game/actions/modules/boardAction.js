const { Chess } = require('chess.js');
const path = require('path');
const FTI = require('fen-to-image');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { titleMessage } = require('../../helpers/replyMessages');

const PATH = path.join('src', 'board.png');

const getCurrentBoard = async (gameObj, message, title, lastMove) => {
	await FTI({
		fen: gameObj.currentGameState,
		color: 'white',
		whiteCheck: false,
		blackCheck: false,
		lastMove: lastMove,
		dirsave: PATH,
	}).catch((err) => console.log(err));
	const file = new MessageAttachment(PATH.toString());
	const embed = new MessageEmbed()
		.setTitle(title)
		.setImage('attachment://discordjs.png');
	return { content: message, embeds: [embed], files: [file] };
};

exports.boardAction = async (boardMessage, gameObj) => {
	const chess = new Chess(gameObj.currentGameState);
	const player = gameObj.players[gameObj.round.userIndex];
	const lastRound = gameObj.moves[gameObj.round.roundNumber - 1];
	const { from, to } = lastRound;
	const lastMove = `${from}${to}`;
	const title = `${(chess.game_over) ? 'Game Over' : titleMessage(player, chess.turn())}`;
	const boardMsg = `${boardMessage}`;
	let message;
	if (lastMove === '') {
		message = await getCurrentBoard(gameObj, boardMessage, title, 'a1a1');
	} else {
		message = await getCurrentBoard(gameObj, boardMessage, title, lastMove);
	}
	return message;
};
