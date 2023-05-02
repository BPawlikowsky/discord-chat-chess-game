const { writeFile } = require('fs/promises');

exports.createWriteFile = async (data, path) => {
	try {
		await writeFile(path, data);
		console.log('created/written file.');
	}
	catch (err) {
		return console.log(`createWriteFile: ${err}`);
	}
};