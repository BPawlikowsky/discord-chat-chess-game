import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { gameConstants } from "../helpers/gameConstants.js";

const { JOIN_GAME_BUTTON_ID, JOIN_GO_BACK_BUTTON_ID } = gameConstants;

/** @returns {import("discord.js").InteractionUpdateOptions} */
const confirmJoinGameComponent = (gameId) => {
  const joinGameButton = new ButtonBuilder()
    .setCustomId(JOIN_GAME_BUTTON_ID)
    .setLabel("Join")
    .setStyle(ButtonStyle.Success);

  const goBackButton = new ButtonBuilder()
    .setCustomId(JOIN_GO_BACK_BUTTON_ID)
    .setLabel("Go Back")
    .setStyle(ButtonStyle.Danger);

  const joinMenuEmbed = new EmbedBuilder()
    .setTitle("Confirm joining an open game")
    .setColor(0x0099ff)
    .setDescription(
      "Now that you've chosen the game, you can join it or return to selection menu.",
    )
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    joinGameButton,
    goBackButton,
  );

  return {
    content: gameId,
    components: [row],
    embeds: [joinMenuEmbed],
    files: [],
  };
};

export default confirmJoinGameComponent;
