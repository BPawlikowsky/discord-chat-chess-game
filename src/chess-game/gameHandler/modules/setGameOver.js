const { getGames } = require('./getGames');
const path = require('path');

const GAMES_LIST_PATH = path.normalize(path.posix.join(__dirname, '..', '..', 'gamesList.json'));

exports.setGameOver = (gameObj) => {
	gameObj.isGameOver = true;
	const games = getGames(GAMES_LIST_PATH);
	const game = games.find((el) => el.id === gameObj.id);
	game.isGameOver = true;
};