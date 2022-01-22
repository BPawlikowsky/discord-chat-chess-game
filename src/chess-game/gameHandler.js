const { MessageAttachment, MessageEmbed } = require('discord.js');
const { readGameFile, saveGameFile } = require('./gameFileHandler');
const FTI = require('fen-to-image');

module.exports = {
	getRegisteredPlayers: async () => {
		const gameObj = await readGameFile();
		if (gameObj) return gameObj.players;
		return [];
	},
	registerPlayer: async (user) => {
		const gameObj = await readGameFile();
		const playersArr = [...gameObj.players];
		playersArr.push(user);
		gameObj.players = playersArr;
		await saveGameFile(gameObj);
		console.log(`Player ${playersArr.length} registered: ${user}`);
	},
	increaseRound: (gameObj, userIndex) => {
		const gameObject = { ...gameObj };
		gameObject.round.userIndex = userIndex;
		gameObject.round.roundNumber = gameObj.round.roundNumber + 1;
		console.log(`Round increased to ${gameObj.round.roundNumber}`);
		return gameObject.round;
	},
	getRound: async () => {
		const gameObj = await readGameFile();
		return gameObj.round;
	},
	checkIfMoveLegal: (move) => {
		return /[a-h][1-8]/.test(move);
	},
	getCurrentBoard: async (gameObj, message, title, lastMove, path) => {
		await FTI({
			fen: gameObj.currentGameState,
			color: 'white',
			whiteCheck: false,
			blackCheck: false,
			lastMove: lastMove,
			dirsave: path,
		})
			.catch(err => console.log(err));
		const file = new MessageAttachment(path.toString());
		const embed = new MessageEmbed()
			.setTitle(title)
			.setImage('attachment://discordjs.png');
		return { content: message, embeds: [embed], files: [file] };
	},
	constants: {
		W: '0',
		B: '1',
	},
};