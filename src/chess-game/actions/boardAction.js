import { Chess } from "chess.js";
import path, { normalize, join, resolve } from "path";
import FTI from "fen-to-image";
import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { fileURLToPath } from "url";
import replyMessages from "../helpers/replyMessages.js";
import gameManagerApi from "../gameHandlers/gameManagerApi.js";
import Logger from "../helpers/logger.js";

const { titleMessage } = replyMessages;

const logger = Logger.getInstance();

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
const PATH = normalize(join(dirname, "..", "..", "..", "board.png"));

const getCurrentBoard = async (gameObj, message, title, lastMove) => {
  try {
    await FTI({
      fen: gameObj.gameState,
      color: "white",
      whiteCheck: false,
      blackCheck: false,
      lastMove,
      dirsave: PATH,
    });
  } catch (err) {
    logger.error(err);
  }

  const file = new AttachmentBuilder(PATH);
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setImage("attachment://board.png");
  return { content: message, embeds: [embed], files: [file] };
};

const boardAction = async (interaction) => {
  const { getGames } = gameManagerApi;
  const { username } = interaction.user;
  const game = getGames()
    .find((game) => game.getGame().getPlayers().includes(username))
    .getGame()
    .getGameAsJSON();

  const chess = new Chess(game.gameState);
  const player = game.players[game.round.playerIndex];
  const lastRound = game.moves[game.moves.length - 1];
  const { from, to } =
    game.round.roundNumber !== 0 ? lastRound : { from: "a1", to: "a1" };
  const lastMove = `${from}${to}`;
  let title = "";
  if (chess.isGameOver()) {
    title = "Game Over";
    // game.isGameOver = true;
  } else {
    title = titleMessage(player, chess.turn());
  }

  const boardMessage = `Game id: ${game.id}, Players: ${game.players.join(", ")}, round: ${game.round.roundNumber}`;
  let message;
  if (lastMove === "") {
    message = await getCurrentBoard(game, boardMessage, title, "a1a1");
  } else {
    message = await getCurrentBoard(game, boardMessage, title, lastMove);
  }
  return message;
};

export default boardAction;
