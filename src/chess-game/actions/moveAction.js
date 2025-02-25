import { Chess } from "chess.js";
import move from "./move.js";
import replyMessages from "../helpers/replyMessages.js";
import gameManagerApi from "../gameHandlers/gameManagerApi.js";
import Logger from "../helpers/logger.js";

const { wrongPlayerMessage, typoFromMoveMessage, typoToMoveMessage } =
  replyMessages;

const logger = Logger.getInstance();

const moveAction = async ({ moveFrom, moveTo, username, id }) => {
  logger.debug(`username: ${username}`);
  logger.debug(`move_from: ${moveFrom}`);
  logger.debug(`move_to: ${moveTo}`);

  const { checkIfMoveLegal, updateGameState, getGameByUsernameAndId } =
    gameManagerApi;
  const game = getGameByUsernameAndId({ username, id })
    .getGame()
    .getGameAsJSON();

  const chess = new Chess(game.gameState);

  const currentUser = game.round.playerIndex;
  if (game.players[currentUser] !== username) {
    return wrongPlayerMessage;
  }

  if (!checkIfMoveLegal(moveFrom)) {
    return typoFromMoveMessage;
  }

  if (!checkIfMoveLegal(moveTo)) {
    return typoToMoveMessage;
  }

  const { moveMessage, updatedGameState } = await move({
    game,
    chess,
    user: username,
    moveFrom,
    moveTo,
  });

  updateGameState(updatedGameState);

  return moveMessage;
};

export default moveAction;
