import path from 'path';
import { fileURLToPath } from 'url';
import getGames from './getGames';
import readGameFile from '../gameFileHandler/readGameFile';

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
const GAMES_LIST_PATH = path.normalize(path.posix.join(dirname, '..', '..', '..', '..', 'gamesList.json'));

const setGameID = async (gamePath) => {
  const games = getGames(GAMES_LIST_PATH);
  const gameObj = await readGameFile(gamePath);
  const game = games.find((el) => el.filePath === gamePath);
  game.id = gameObj.id;
};

export default setGameID;
