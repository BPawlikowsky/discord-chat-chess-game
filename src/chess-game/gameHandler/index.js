const { getGames } = require('./modules/getGames');
const { getOpenGames } = require('./modules/getOpenGames');
const { isUserInActiveGame } = require('./modules/isUserInActiveGame');

module.exports = {
	getGames: getGames,
	isUserInActiveGame: isUserInActiveGame,
	getOpenGames: getOpenGames,
};