import { Chess } from 'chess.js';
import path, { normalize, join, resolve } from 'path';
import FTI from 'fen-to-image';
import { MessageAttachment, MessageEmbed } from 'discord.js';
import { fileURLToPath } from 'url';
import { replyMessages } from '../helpers';

const { titleMessage } = replyMessages;

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
const PATH = normalize(
  join(dirname, '..', '..', '..', '..', 'board.png'),
);

const getCurrentBoard = async (gameObj, message, title, lastMove) => {
  try {
    await FTI({
      fen: gameObj.currentGameState,
      color: 'white',
      whiteCheck: false,
      blackCheck: false,
      lastMove,
      dirsave: PATH,
    });
  } catch (err) {
    console.log(err);
  }

  const file = new MessageAttachment(resolve(__dirname, PATH.toString()));
  const embed = new MessageEmbed()
    .setTitle(title)
    .setImage('attachment://discordjs.png');
  return { content: message, embeds: [embed], files: [file] };
};

const boardAction = async (boardMessage, gameObj) => {
  const chess = new Chess(gameObj.currentGameState);
  const player = gameObj.players[gameObj.round.userIndex];
  let lastRound;
  if (gameObj.moves.length > 0) {
    lastRound = gameObj.moves[gameObj.round.roundNumber - 1];
  } else {
    lastRound = { from: 'a1', to: 'a1' };
  }
  const { from, to } = lastRound;
  const lastMove = `${from}${to}`;
  let title;
  if (chess.game_over()) {
    title = 'Game Over';
    gameObj.isGameOver = true;
  } else {
    title = titleMessage(player, chess.turn());
  }
  let message;
  if (lastMove === '') {
    message = await getCurrentBoard(gameObj, boardMessage, title, 'a1a1');
  } else {
    message = await getCurrentBoard(gameObj, boardMessage, title, lastMove);
  }
  return message;
};

export default (boardAction);
