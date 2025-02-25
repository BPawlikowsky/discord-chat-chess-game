import gameManagerApi from "../gameHandlers/gameManagerApi.js";
import { gameConstants } from "../helpers/gameConstants.js";
import Logger from "../helpers/logger.js";
import replyMessages from "../helpers/replyMessages.js";

const { BLACK, WHITE } = gameConstants;

const { legalMoveMessage, illegalMoveMessage } = replyMessages;

const logger = Logger.getInstance();

const move = async ({ game, chess, user, moveFrom, moveTo }) => {
  const { setGameOver } = gameManagerApi;
  try {
    const chessMove = chess.move({ from: moveFrom, to: moveTo });
    if (chessMove === null) {
      const moves = chess.moves({ verbose: true, square: moveFrom });
      if (chess.game_over()) {
        game = await setGameOver(game);
      }
      return { moveMessage: illegalMoveMessage(moves), updatedGameState: game };
    }
    const moveValues = {
      user,
      color: chessMove.color,
      from: moveFrom,
      to: moveTo,
      fen: chess.fen(),
    };

    game.moves.push(moveValues);
    game.gameState = moveValues.fen;

    game.round.roundNumber += 1;
    game.round.playerIndex = chess.turn() === "b" ? BLACK : WHITE;
  } catch (e) {
    logger.error(e);
  }

  const message = legalMoveMessage(user, moveFrom, moveTo);
  return { moveMessage: `${message}`, updatedGameState: game };
};

export default move;
