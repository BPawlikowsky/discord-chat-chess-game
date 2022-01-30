const { Chess } = require('chess.js');
const { checkIfMoveLegal } = require('../../helpers');
const {
	wrongPlayerMessage,
	typoFromMoveMessage,
	typoToMoveMessage,
} = require('../../helpers/replyMessages');
const { move } = require('./move');

exports.moveAction = (user, moveFrom, moveTo, gameObj) => {
	let moveMessage;
	const chess = new Chess(gameObj.currentGameState);

	const currentUser = gameObj.round.userIndex;
	if (gameObj.players[currentUser] !== user) {
		return wrongPlayerMessage();
	}

	if (!checkIfMoveLegal(moveFrom)) {
		return typoFromMoveMessage();
	}
	else if (!checkIfMoveLegal(moveTo)) {
		return typoToMoveMessage();
	}
	else {
		moveMessage = move(gameObj, chess, user, moveFrom, moveTo);
	}

	return moveMessage;
};
