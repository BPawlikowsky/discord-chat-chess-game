const { isGameFile, createGameFile } = require('./gameFileHandler');
const {
	getRegisteredPlayers, registerPlayer, increaseRound,
} = require('./gameHandler');
const {
	playerRegMessage, allPlayersRegMessage, startGameMessage,
} = require('./replyMessages');

exports.startGame = async (user) => {
	const isGameFileCreated = await isGameFile();
	if (!isGameFileCreated) {
		await createGameFile();
	}

	const players = [...await getRegisteredPlayers()];
	if (players.length < 2) {
		await registerPlayer(user);
		if (players.length === 1) {
			return `${playerRegMessage(user, players.length + 1)}\n${startGameMessage()}`;
		}
		return playerRegMessage(user, players.length + 1);
	}
	else if (players.length === 2) {
		return allPlayersRegMessage();
	}
};