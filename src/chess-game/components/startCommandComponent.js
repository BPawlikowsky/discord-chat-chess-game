import { ActionRowBuilder } from "@discordjs/builders";
import { AttachmentBuilder } from "discord.js";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { gameConstants } from "../helpers/gameConstants.js";

const { JOIN_GAME_ID, NEW_GAME_ID } = gameConstants;

/** @returns {import("discord.js").InteractionReplyOptions} */
const StartCommandComponent = (custom_username) => {
  const StartMenuEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Start Menu")
    .setDescription(
      "Welcome to Chess BOT,\nhere you can start a new game\nor join one of the open games avalable.",
    )
    .setImage("attachment://board.png")
    .setTimestamp();
  const NewGameButton = new ButtonBuilder()
    .setCustomId(NEW_GAME_ID)
    .setLabel("Start New Game")
    .setStyle(ButtonStyle.Primary);

  const JoinGameButton = new ButtonBuilder()
    .setCustomId(JOIN_GAME_ID)
    .setLabel("Join Open Game")
    .setStyle(ButtonStyle.Secondary);

  /** @type {ActionRowBuilder & { type: number }} */
  const row = new ActionRowBuilder().addComponents(
    NewGameButton,
    JoinGameButton,
  );

  const board = new AttachmentBuilder("board.png");
  return {
    content: custom_username,
    components: [row],
    embeds: [StartMenuEmbed],
    files: [board],
  };
};
export default StartCommandComponent;
