const { isGameFile, createGameFile } = require('../../gameFileHandler');
const {
	getRegisteredPlayers,
	registerPlayer,
} = require('../../helpers');
const {
	playerRegMessage,
	allPlayersRegMessage,
	startGameMessage,
} = require('../../helpers/replyMessages');

exports.startAction = async (user) => {
	const isGameFileCreated = await isGameFile();
	if (!isGameFileCreated) {
		await createGameFile();
	}

	const players = getRegisteredPlayers();
	if (players.length < 2) {
		await registerPlayer(user);
		if (players.length === 1) {
			return `${playerRegMessage(
				user,
				players.length + 1
			)}\n${startGameMessage()}`;
		}
		return playerRegMessage(user, players.length + 1);
	} else if (players.length === 2) {
		return allPlayersRegMessage();
	}
};
