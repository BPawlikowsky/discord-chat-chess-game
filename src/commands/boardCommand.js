import { SlashCommandBuilder } from "discord.js";
import boardAction from "../chess-game/actions/boardAction.js";

const data = new SlashCommandBuilder()
  .setName("board")
  .setDescription("show board");
/** @param {import("discord.js").ChatInputCommandInteraction} interaction */
const execute = async (interaction) => {
  return await interaction.reply(await boardAction(interaction));
};

export const boardCommand = {
  data,
  execute,
};
