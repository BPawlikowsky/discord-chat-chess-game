import path, { normalize, posix } from 'path';
import { fileURLToPath } from 'url';
import getGames from './getGames';

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
const GAMES_LIST_PATH = normalize(posix.join(dirname, '..', '..', 'gamesList.json'));

const setGameOver = (gameObj) => {
  const newGameObject = gameObj;
  newGameObject.isGameOver = true;
  const games = getGames(GAMES_LIST_PATH);
  const game = games.find((el) => el.id === gameObj.id);
  game.isGameOver = true;
  return newGameObject;
};

export default setGameOver;
