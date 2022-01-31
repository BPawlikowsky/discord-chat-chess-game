const { isGameFile, createGameFile } = require('../../gameFileHandler');
const { setGameID } = require('../../gameHandler');
const {
	getRegisteredPlayers,
	registerPlayer,
} = require('../../helpers');
const {
	playerRegMessage,
	allPlayersRegMessage,
	startGameMessage,
} = require('../../helpers/replyMessages');

exports.startAction = async (user, gamePath) => {
	const isGameFileCreated = await isGameFile(gamePath);
	if (!isGameFileCreated) {
		await createGameFile(gamePath);
		setGameID(gamePath);
	}

	const players = getRegisteredPlayers(gamePath);
	if (players.length < 2) {
		await registerPlayer(user, gamePath);
		if (players.length === 1) {
			return `${playerRegMessage(user, players.length + 1)}\n${startGameMessage()}`;
		}
		return playerRegMessage(user, players.length + 1);
	}
	else if (players.length === 2) {
		return allPlayersRegMessage();
	}
};
