import createGameFile from '../gameFileHandler/createGameFile';
import isGameFile from '../gameFileHandler/isGameFile';
import setGameID from '../gameHandler';
import { getRegisteredPlayers, registerPlayer, replyMessages } from '../helpers';

const { playerRegMessage, allPlayersRegMessage, startGameMessage } = replyMessages;

const startAction = async (user, gamePath) => {
  const isGameFileCreated = await isGameFile(gamePath);
  console.log(isGameFileCreated);
  if (!isGameFileCreated) {
    await createGameFile(gamePath).catch((e) => console.log(e));
    await setGameID(gamePath);
  }

  console.log(`startAction: path: ${gamePath}`);
  const players = getRegisteredPlayers(gamePath);
  if (players.length < 2) {
    await registerPlayer(user, gamePath);
    if (players.length === 1) {
      return `${playerRegMessage(user, players.length + 1)}\n${startGameMessage()}`;
    }
    return playerRegMessage(user, players.length + 1);
  }
  if (players.length === 2) {
    return allPlayersRegMessage();
  }

  return null;
};

export default startAction;
