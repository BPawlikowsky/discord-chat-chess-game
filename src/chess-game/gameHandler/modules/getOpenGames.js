exports.getOpenGames = (games) => {
	const openGames = games.find(game => game.players.length === 1);
	return openGames;
};