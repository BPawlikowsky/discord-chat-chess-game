const { constants } = require('../../helpers');
const {
	legalMoveMessage,
	illegalMoveMessage,
} = require('../../helpers/replyMessages');

const { B, W } = constants;

exports.move = (gameObj, chess, user, moveFrom, moveTo) => {
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

	gameObj.round.roundNumber++;
	gameObj.round.userIndex = chess.turn() === 'b' ? B : W;

	const message = legalMoveMessage(user, moveFrom, moveTo);
	return `${message}`;
};
