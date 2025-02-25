import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import gameManagerApi from "../chess-game/gameHandlers/gameManagerApi.js";

const data = new SlashCommandBuilder()
  .setName("games")
  .setDescription("list of games you are playing")
  .addStringOption(
    new SlashCommandStringOption()
      .setName("custom_username")
      .setDescription("debug: set custom user name"),
  );

/** @param {import("discord.js").ChatInputCommandInteraction} interaction */
const execute = async (interaction) => {
  const { getClosedGamesWithUsername } = gameManagerApi;
  const username =
    interaction.options.getString("custom_username") ||
    interaction.user.username;
  const list = getClosedGamesWithUsername(username).map((game) => {
    const players = game.getGame().getPlayers();
    const id = game.getId();
    const round = game.getGame().getRound().roundNumber;
    return `id: ${id}, players: ${players.join(", ")}, round: ${round}`;
  });
  await interaction.reply(list.join("\n"));
};

export const gamesCommand = {
  data,
  execute,
};
