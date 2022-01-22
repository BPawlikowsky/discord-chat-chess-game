const { inlineCode } = require('@discordjs/builders');
const { Chess } = require('chess.js');
const { readGameFile, saveGameFile } = require('./gameFileHandler');

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
	increaseRound: async (userIndex) => {
		const gameObj = await readGameFile();
		gameObj.round.userIndex = userIndex;
		gameObj.round.roundNumber = gameObj.round.roundNumber + 1;

		await saveGameFile(gameObj);
		console.log(`Round increased to ${gameObj.round.roundNumber}`);
	},
	getRound: async () => {
		const gameObj = await readGameFile();
		return gameObj.round;
	},
	checkIfMoveLegal: (move) => {
		return /[a-h][1-8]/.test(move);
	},
	getCurrentBoard: async () => {
		const gameObj = await readGameFile();
		const chess = Chess(gameObj.currentGameState);
		const player = gameObj.players[gameObj.round.userIndex];
		return `Current player: ${player} color: ${chess.turn()}\n${inlineCode(chess.ascii())}`;
	},
	constants: {
		W: '0',
		B: '1',
	},
};