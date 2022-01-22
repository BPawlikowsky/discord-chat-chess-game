const { access, readFile, writeFile } = require('fs/promises');
const { constants } = require('fs');
const gameObjectPrototype = require('./gameObjectPrototype');

const PATH = 'src/game.json';

const createWriteFile = async (data) => {
	await writeFile(PATH, data)
		.then(() => {
			console.log('created/written file.');
		})
		.catch((err) => console.log(err));
};

module.exports = {
	isGameFile: async () => {
		return access(PATH, constants.F_OK)
			.then(() => {
				console.log('file exists');
				return true;
			})
			.catch(() => {
				console.log('file does not exist.');
				return false;
			});
	},
	createGameFile: async () => {
		const data = JSON.stringify(gameObjectPrototype);
		await createWriteFile(data);
	},
	readGameFile: async () => {
		return readFile(PATH)
			.then((result) => {
				return JSON.parse(result);
			})
			.catch((err) => console.log(err));
	},
	saveGameFile: async (gameObj) => {
		const data = JSON.stringify(gameObj);
		await createWriteFile(data);
	},
};