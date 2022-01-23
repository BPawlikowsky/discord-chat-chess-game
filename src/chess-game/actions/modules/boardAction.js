const { Chess } = require('chess.js');
const { readGameFile } = require('../../gameFileHandler');
const path = require('path');
const FTI = require('fen-to-image');
const { MessageAttachment, MessageEmbed } = require('discord.js');

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

exports.boardAction = async (moveFrom, moveTo, boardMessage) => {
	const gameObj = readGameFile();
	const chess = new Chess(gameObj.currentGameState);
	const player = gameObj.players[gameObj.round.userIndex];
	const lastMove = `${moveFrom}${moveTo}`;
	const title = `Current player: ${player} color: ${chess.turn()}`;
	let message;
	if (lastMove !== '') {
		message = await getCurrentBoard(gameObj, boardMessage, title, 'a1a1');
	} else {
		message = await getCurrentBoard(gameObj, boardMessage, title, lastMove);
	}
	return message;
};
