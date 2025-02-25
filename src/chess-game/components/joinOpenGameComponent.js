import { ActionRowBuilder, EmbedBuilder } from "@discordjs/builders";
import gameManagerApi from "../gameHandlers/gameManagerApi.js";
import { gameConstants } from "../helpers/gameConstants.js";
import gamesMenu from "./menus/gamesMenu.js";

const { OPEN_GAMES_MENU_ID } = gameConstants;

const { getOpenGames } = gameManagerApi;

/** @type {ActionRowBuilder & { type: number }} */
const row = new ActionRowBuilder().addComponents(
  gamesMenu({ id: OPEN_GAMES_MENU_ID, games: getOpenGames() }),
);

const newMenuEmbed = new EmbedBuilder()
  .setTitle("Join Open Game")
  .setColor(0x0099ff)
  .setDescription("Choose a game you'd like to join")
  .setTimestamp();

/** @type {import("discord.js").InteractionUpdateOptions} */
export default {
  components: [row],
  embeds: [newMenuEmbed],
  files: [],
};
