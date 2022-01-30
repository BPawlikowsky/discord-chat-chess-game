exports.isUserInActiveGame = (user, games) => {
	let isUser = false;
	games.forEach((game) => {
		if (
			game.players.length > 1
			&& game.players.includes(user)
			&& !game.isGameOver
		) {
			isUser = true;
		}
	});
	return isUser;
};