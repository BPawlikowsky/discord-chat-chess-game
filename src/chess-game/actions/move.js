import { constants } from '../helpers/index';
import setGameOver from '../gameHandlers/setGameOver';
import replyMessages from '../helpers/modules/replyMessages';

const { legalMoveMessage, illegalMoveMessage } = replyMessages;

const { B, W } = constants;

const move = (gameObj, chess, user, moveFrom, moveTo) => {
  const chessMove = chess.move({ from: moveFrom, to: moveTo });
  if (chessMove === null) {
    const moves = chess.moves({ verbose: true, square: moveFrom });
    if (chess.game_over()) {
      gameObj = setGameOver(gameObj);
    }
    return illegalMoveMessage(moves);
  }
  const moveValues = {
    user,
    color: chessMove.color,
    from: moveFrom,
    to: moveTo,
    fen: chess.fen(),
  };

  gameObj.moves.push(moveValues);
  gameObj.currentGameState = chess.fen();

  gameObj.round.roundNumber += 1;
  gameObj.round.userIndex = chess.turn() === 'b' ? B : W;

  const message = legalMoveMessage(user, moveFrom, moveTo);
  return `${message}`;
};

export default move;
