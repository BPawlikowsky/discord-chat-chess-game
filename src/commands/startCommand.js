import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import StartCommandComponent from "../chess-game/components/startCommandComponent.js";
import moveAction from "../chess-game/actions/moveAction.js";

const data = new SlashCommandBuilder()
  .setName("start")
  .setDescription("start a new game of chess")
  .addStringOption(
    new SlashCommandStringOption()
      .setName("custom_username")
      .setDescription("debug: set custom user name"),
  );

/** @param {import("discord.js").ChatInputCommandInteraction} interaction */
const execute = async (interaction) => {
  const username =
    interaction.options.getString("custom_username") ||
    interaction.user.username;
  const moveTo = interaction.options.getString("move_to");
  const moveFrom = interaction.options.getString("move_from");
  const id = interaction.options.getString("id");
  if (moveFrom && moveTo && id) {
    await interaction.reply(
      await moveAction({ moveFrom, moveTo, id, username }),
    );
  } else {
    await interaction.reply(StartCommandComponent(username));
  }
};

export const startCommand = {
  data,
  execute,
};
