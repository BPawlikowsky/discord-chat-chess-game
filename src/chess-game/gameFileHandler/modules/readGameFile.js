const path = require('path');
const { absoluteToRelativePath } = require('../../helpers/modules/absoluteToRelativePath');

exports.readGameFile = (pathToFile) => {
	const finalPath = absoluteToRelativePath(pathToFile, __dirname);
	const gameObj = require(finalPath);
	console.log('readGameFile:', gameObj);
	return gameObj;
};
