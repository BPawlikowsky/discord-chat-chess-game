const { getGames } = require('./modules/getGames');
const { getOpenGames } = require('./modules/getOpenGames');
const { isUserInActiveGame } = require('./modules/isUserInActiveGame');
const { setGameID } = require('./modules/setGameID');
const { setGameOver } = require('./modules/setGameOver');

module.exports = {
	getGames: getGames,
	isUserInActiveGame: isUserInActiveGame,
	getOpenGames: getOpenGames,
	setGameOver: setGameOver,
	setGameID: setGameID,
};