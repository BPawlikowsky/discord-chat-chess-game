const { getGames } = require('./getGames');
const path = require('path');
const { readGameFile } = require('../../gameFileHandler');

const GAMES_LIST_PATH = path.normalize(path.posix.join(__dirname, '..', '..', 'gamesList.json'));

exports.setGameID = (gamePath) => {
	const games = getGames(GAMES_LIST_PATH);
    const gameObj = readGameFile(gamePath);
	const game = games.find((el) => el.filePath === gamePath);
	game.id = gameObj.id;
};