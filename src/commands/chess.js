const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameHandler } = require('../chess-game/gameHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Chess game controller.')
		.addStringOption(opt => opt
			.setName('input')
			.setRequired(true)
			.setDescription('chess game,"start" to start, "move [from] [to]" to move piece, "board" to view the current board'),
		),
	async execute(interaction) {
		await gameHandler(interaction);
	},
};
