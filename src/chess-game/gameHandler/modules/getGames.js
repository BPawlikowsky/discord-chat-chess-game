const { absoluteToRelativePath } = require('../../helpers');

exports.getGames = (path) => {
	const finalPath = absoluteToRelativePath(path, __dirname);
	const games = require(finalPath);
	return games;
};