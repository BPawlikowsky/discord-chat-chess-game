import { SlashCommandBuilder } from "@discordjs/builders";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");
/** @param {import("discord.js").ChatInputCommandInteraction} interaction */
const execute = async (interaction) => {
  await interaction.reply("Pong!");
};

export const pingCommand = { data, execute };
