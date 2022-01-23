const { Chess } = require("chess.js");
const { readGameFile } = require("../gameFileHandler");
const { getCurrentBoard } = require("../gameHandler");
const path = require('path');

const PATH = path.join('src', 'board.png');

exports.boardAction = async (moveFrom, moveTo, boardMessage) => {
	const gameObj = readGameFile();
	const chess = new Chess(gameObj.currentGameState);
	const player = gameObj.players[gameObj.round.userIndex];
	const lastMove = `${moveFrom}${moveTo}`;
	const title = `Current player: ${player} color: ${chess.turn()}`;
    let message;
	if (lastMove !== '') {
		message = await getCurrentBoard(
			gameObj,
			boardMessage,
			title,
			'a1a1',
			PATH
		);
	} else {
		message = await getCurrentBoard(
			gameObj,
			boardMessage,
			title,
			lastMove,
			PATH
		);
	}
    return message;
};
