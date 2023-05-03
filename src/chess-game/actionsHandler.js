import boardAction from './actions/boardAction';
import moveAction from './actions/moveAction';
import startAction from './actions/startAction';
import readGameFile from './gameFileHandler/readGameFile';
import saveGameFile from './gameFileHandler/saveGameFile';

const actionsHandler = async (optionsAsArray, user, gamePath) => {
  const [selectedOption, moveFrom, moveTo] = optionsAsArray;

  switch (selectedOption) {
    case 'start':
    {
      const message = await startAction(user.username, gamePath);
      return message;
    }
    case 'move':
    {
      const gameObj = await readGameFile(gamePath);
      const moveMessage = await moveAction(
        user.username,
        moveFrom,
        moveTo,
        gameObj,
      );
      await saveGameFile(gameObj, gamePath);
      const embeddedMessage = await boardAction(moveMessage, gameObj);
      return embeddedMessage;
    }
    case 'board':
    {
      const gameObj = await readGameFile(gamePath);
      const boardMessage = 'Current board view';
      const message = await boardAction(boardMessage, gameObj);
      return message;
    }
    default:
    {
      return 'Could not identify command, please try again.';
    }
  }
};

export default actionsHandler;
