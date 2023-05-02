import path, { normalize, posix, join } from 'path';
import { fileURLToPath } from 'url';
import getGames from './gameHandlers/index';
import { getOptions } from './helpers/index';
import isUserInActiveGame from './gameHandlers/isUserInActiveGame';
import getOpenGames from './gameHandlers/getOpenGames';
import actionsHandler from './actionsHandler';
import isGameFile from './gameFileHandler/isGameFile';
import createGameFile from './gameFileHandler/createGameFile';
import saveGameFile from './gameFileHandler/saveGameFile';

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
const GAMES_LIST_PATH = normalize(posix.join(dirname, '..', '..', 'gamesList.json'));
const GAMES_PATH = normalize(`${posix.join(dirname, '..', '..', 'games')}`);

const gameHandler = async (interaction) => {
  const { options, user } = interaction;
  const isGameFileCreated = await isGameFile(GAMES_LIST_PATH);
  if (!isGameFileCreated) {
    console.log('No Game file');
    createGameFile(GAMES_LIST_PATH);
  }
  const games = getGames(GAMES_LIST_PATH);

  let optionsAsString;
  try {
    optionsAsString = await options.getString('input');
  } catch (err) {
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
    } else {
      const openGames = getOpenGames(games);
      console.log(`gameHandler: openGames: ${openGames}`);
      if (openGames?.length > 0) {
        gamePath = openGames[0].filePath;
        openGames[0].players.push(user.username);
      } else {
        gamePath = join(GAMES_PATH, `game${games.length + 1}.json`);
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
  } else {
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
    } else {
      message = 'No active game available.';
    }
  }
  console.log(`gameHandler: path: ${gamePath}`);

  if (!message) message = await actionsHandler(optionsAsArray, user, gamePath);

  try {
    await interaction.reply(message);
  } catch (err) {
    console.log(err);
  }
};

export default gameHandler;
