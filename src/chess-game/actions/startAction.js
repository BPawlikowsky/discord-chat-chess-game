import gameManagerApi from "../gameHandlers/gameManagerApi.js";
import { gameConstants } from "../helpers/gameConstants.js";
import replyMessages from "../helpers/replyMessages.js";

const { OPEN } = gameConstants;

const { startGameMessage, playerAlreadyInGame, playerRegMessage } =
  replyMessages;

/**
 * @param {string} username
 * @returns
 */
const startAction = async (username) => {
  const { newGame, getGames, addPlayerToGame, getOpenGames } = gameManagerApi;
  const gamesContainingUser = getGames().filter(
    (game) =>
      game.getGame().getPlayers().includes(username) &&
      game.getStatus() === OPEN,
  );

  const playerIsNotInOpenGame = gamesContainingUser.length === 0;

  const openGames = getOpenGames();
  const areOpenGamesAvailable = openGames.length > 0;

  if (playerIsNotInOpenGame && areOpenGamesAvailable) {
    addPlayerToGame(username);
    return playerRegMessage(username, 2);
  }

  if (playerIsNotInOpenGame) {
    newGame(username);
    return startGameMessage;
  }

  return playerAlreadyInGame;
};

export default startAction;
