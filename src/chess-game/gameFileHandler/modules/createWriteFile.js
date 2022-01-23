const { writeFile } = require('fs/promises');

const PATH = 'src/game.json';

exports.createWriteFile = async (data) => {
	return writeFile(PATH, data)
		.then(() => {
			console.log('created/written file.');
		})
		.catch((err) => console.log(err));
};