const { access } = require('fs/promises');
const { constants } = require('fs');

exports.isGameFile = async (path) => {
	try {
		await access(path, constants.F_OK);
		console.log('file exists');
		return true;
	} catch (e) {
		console.log('file does not exist in path: ' + path);
		return false;
	}
};
