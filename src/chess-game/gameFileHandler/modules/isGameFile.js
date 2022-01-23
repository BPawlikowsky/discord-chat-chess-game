const { access } = require('fs/promises');
const { constants } = require('fs');

const PATH = 'src/game.json';

exports.isGameFile = async () => {
	return access(PATH, constants.F_OK)
		.then(() => {
			console.log('file exists');
			return true;
		})
		.catch(() => {
			console.log('file does not exist.');
			return false;
		});
};
