const { Chess } = require('chess.js');
const { readGameFile, saveGameFile } = require('../../gameFileHandler');
const { checkIfMoveLegal } = require('../../helpers');
const { wrongPlayerMessage, typoFromMoveMessage, typoToMoveMessage } = require('../../helpers/replyMessages');
const { boardAction } = require('./boardAction');
const { move } = require('./move');

exports.moveAction = async (user, moveFrom, moveTo) => {
	let moveMessage;
	const gameObj = readGameFile();
	const chess = new Chess(gameObj.currentGameState);

	const currentUser = gameObj.round.userIndex;
	if (gameObj.players[currentUser] !== user) {
		return wrongPlayerMessage();
	}

	if (!checkIfMoveLegal(moveFrom)) {
		return typoFromMoveMessage();
	} else if (!checkIfMoveLegal(moveTo)) {
		return typoToMoveMessage();
	} else {
		moveMessage = move(gameObj, chess, user, moveFrom, moveTo);
	}
	
	await saveGameFile(gameObj);

	const embeddedMessage = await boardAction(
		moveFrom,
		moveTo,
		moveMessage
	);
	return embeddedMessage;
};
