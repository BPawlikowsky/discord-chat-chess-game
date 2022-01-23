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
	const gameObj = readGameFile();

	const chess = new Chess(gameObj.currentGameState);
	
	const currentUser = gameObj.round.userIndex;
	if (gameObj.players[currentUser] !== user) {
		return wrongPlayerMessage();
	}
	const chessMove = chess.move({ from: moveFrom, to: moveTo });
	if (chessMove === null) {
		const moves = chess.moves({ verbose: true, square: moveFrom });
		return illegalMoveMessage(moves);
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
	gameObj.round = increaseRound(gameObj, chess.turn() === 'b' ? B : W);
	await saveGameFile(gameObj);
	const moveStr = legalMoveMessage(user, moveFrom, moveTo);
	return `${moveStr}`;
};