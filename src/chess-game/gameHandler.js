const { actionsHandler } = require('./actionsHandler');
const { getGames, isUserInActiveGame, getOpenGames } = require('./gameHandler/index');
const { getOptions } = require('./helpers/index');
const path = require('path');
const { saveGameFile } = require('./gameFileHandler/modules/saveGameFile');

const GAMES_LIST_PATH = path.normalize(path.posix.join(__dirname, '..', '..', 'gamesList.json'));
const GAMES_PATH = path.normalize(`${path.posix.join(__dirname, '..', '..', 'games')}`);

exports.gameHandler = async (interaction) => {
	const { options, user } = interaction;
	const games = getGames(GAMES_LIST_PATH);

	let optionsAsString;
	try {
		optionsAsString = await options.getString('input');
	}
	catch (err) {
		console.log(err);
	}
	const optionsAsArray = [];

	if (optionsAsString) {
		getOptions(optionsAsString).forEach((el) => optionsAsArray.push(el));
	}

	let gamePath;
	let message;

	if (optionsAsArray[0] === 'start') {
		if (games && isUserInActiveGame(user.username, games)) {
			message = 'Already in active game';
		}
		else {
			const openGames = getOpenGames(games);
			if (openGames.length > 0) {
				gamePath = openGames[0].filePath;
				openGames[0].players.push(user.username);
			}
			else {
				gamePath = path.join(GAMES_PATH, 'game' + (games.length + 1) + '.json');
				const newGame = {
					id: new Date().getTime().toString(),
					players: [user.username],
					isGameOver: false,
					filePath: gamePath,
				};
				games.push(newGame);
			}
			await saveGameFile(games, GAMES_LIST_PATH);
		}
	}
	else {
		let userGame;
		games.forEach((game) => {
			if (!game.isGameOver && game.players.length === 2) {
				if (game.players.includes(user.username)) {
					userGame = game;
				}
			}
			return null;
		});

		if (userGame) {
			console.log(userGame);
			gamePath = userGame.filePath;
		}
		else {
			message = 'No active game available.';
		}
	}

	if (!message) message = await actionsHandler(optionsAsArray, user, gamePath);

	try {
		await interaction.reply(message);
	}
	catch (err) {
		console.log(err);
	}
};
