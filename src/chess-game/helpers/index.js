import saveGameFile from '../gameFileHandler/saveGameFile';
import readGameFile from '../gameFileHandler/readGameFile';
import gameObjectPrototype from './modules/gameObjectPrototype';
import replyMessages from './modules/replyMessages';

const { absoluteToRelativePath } = await import('./modules/absoluteToRelativePath');
const checkIfMoveLegal = (move) => /[a-h][1-8]/.test(move);

const getOptions = (optionsString) => {
  const options = optionsString.split(' ');
  return options;
};
const getRegisteredPlayers = async (path) => {
  const gameObj = await readGameFile(path);
  if (gameObj) return gameObj.players;
  return [];
};

const registerPlayer = async (user, path) => {
  const gameObj = await readGameFile(path);
  const playersArr = [...gameObj.players];
  playersArr.push(user);
  gameObj.players = playersArr;
  await saveGameFile(gameObj, path);
  console.log(`Player ${playersArr.length} registered: ${user}`);
};
export const constants = {
  W: '0',
  B: '1',
};

export {
  getRegisteredPlayers,
  registerPlayer,
  checkIfMoveLegal,
  getOptions,
  gameObjectPrototype,
  absoluteToRelativePath,
  replyMessages,
};
