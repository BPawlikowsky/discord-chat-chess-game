import {
  ActionRowBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import gameManagerApi from "../chess-game/gameHandlers/gameManagerApi.js";
import gamesMenu from "../chess-game/components/menus/gamesMenu.js";
import { gameConstants } from "../chess-game/helpers/gameConstants.js";

const { MOVE_SELECT_GAME_ID } = gameConstants;

const data = new SlashCommandBuilder()
  .setName("move")
  .setDescription("move chess piece in current game")
  .addStringOption((option) =>
    option.setName("move_from").setDescription("move from"),
  )
  .addStringOption((option) =>
    option.setName("move_to").setDescription("move to"),
  )
  .addStringOption((option) =>
    option.setName("custom_username").setDescription("debug: custom username"),
  )
  .addStringOption((option) =>
    option.setName("id").setDescription("debug: set id"),
  );
/** @param {import("discord.js").ChatInputCommandInteraction} interaction */

const execute = async (interaction) => {
  const { getClosedGamesWithUsername } = gameManagerApi;

  const row = new ActionRowBuilder().addComponents(
    gamesMenu({
      id: MOVE_SELECT_GAME_ID,
      games: getClosedGamesWithUsername(interaction.user.username),
    }),
  );

  return interaction.reply({
    content: "select game",
    components: [row],
    flags: [MessageFlags.SuppressNotifications],
  });
};

export const moveCommmand = {
  data,
  execute,
};
