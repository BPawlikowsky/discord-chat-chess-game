exports.getOpenGames = (games) => {
	const openGames = [];
	games.forEach((game) => {
		if (game.players.length === 1) {
			openGames.push(game);
		}
	});
	return openGames;
};