import { SlashCommandBuilder } from '@discordjs/builders';
import gameHandler from '../chess-game/gameHandler.js';

export const data = new SlashCommandBuilder()
  .setName('chess')
  .setDescription('Chess game controller.')
  .addStringOption((opt) => opt
    .setName('input')
    .setRequired(true)
    .setDescription('chess game,"start" to start, "move [from] [to]" to move piece, "board" to view the current board'));
export const execute = async (interaction) => {
  await gameHandler(interaction);
};
