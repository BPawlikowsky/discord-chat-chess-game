const { Chess } = require('chess.js');
const { readGameFile, saveGameFile } = require('./gameFileHandler');
const { checkIfMoveLegal, increaseRound, constants } = require('./gameHandler');
const { typoFromMoveMessage, typoToMoveMessage, legalMoveMessage, illegalMoveMessage, wrongPlayerMessage } = require('./replyMessages');

const { B, W } = constants;

exports.movePiece = async (user, moveFrom, moveTo) => {
	if (!checkIfMoveLegal(moveFrom)) {
		return typoFromMoveMessage();
	}
	else if (!checkIfMoveLegal(moveTo)) {
		return typoToMoveMessage();
	}
	const gameObj = await readGameFile();

	let chess;
	if (gameObj.round.roundNumber === 1) {
		chess = new Chess();
	}
	else {
		chess = new Chess(gameObj.currentGameState);

	}
	const currentUser = gameObj.round.userIndex;
	if (gameObj.players[currentUser] !== user) {
		return wrongPlayerMessage();
	}
	const chessMove = chess.move({ from: moveFrom, to: moveTo });
	if (chessMove === null) {
		return illegalMoveMessage();
	}
	const move = {
		user: user,
		color: chessMove.color,
		from: moveFrom,
		to: moveTo,
		fen: chess.fen(),
	};
	gameObj.moves.push(move);
	gameObj.currentGameState = chess.fen();
	await saveGameFile(gameObj);
	gameObj.round = increaseRound(gameObj, chess.turn() === 'b' ? B : W);
	const moveStr = legalMoveMessage(user, moveFrom, moveTo);
	return `${moveStr}`;
};