import { Chess } from 'chess.js';
import { checkIfMoveLegal, replyMessages } from '../helpers';
import move from './move';

const { wrongPlayerMessage, typoFromMoveMessage, typoToMoveMessage } = replyMessages;

const moveAction = (user, moveFrom, moveTo, gameObj) => {
  const chess = new Chess(gameObj.currentGameState);

  const currentUser = gameObj.round.userIndex;
  if (gameObj.players[currentUser] !== user) {
    return wrongPlayerMessage();
  }

  if (!checkIfMoveLegal(moveFrom)) {
    return typoFromMoveMessage();
  }
  if (!checkIfMoveLegal(moveTo)) {
    return typoToMoveMessage();
  }

  const moveMessage = move(gameObj, chess, user, moveFrom, moveTo);

  return moveMessage;
};

export default moveAction;
