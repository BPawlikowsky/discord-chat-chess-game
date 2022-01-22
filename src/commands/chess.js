const { SlashCommandBuilder } = require('@discordjs/builders');
const { chessGame } = require('../chess-game/chessGame');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Chess game controller.')
		.addStringOption(opt => opt
			.setName('input')
			.setRequired(true)
			.setDescription('chess game,"start" to start\n"move [from] [to]" to move piece'),
		),
	async execute(interaction) {
		chessGame(interaction);
	},
};
