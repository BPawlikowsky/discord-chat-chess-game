const { absoluteToRelativePath } = require('../../helpers');

exports.getGames = (path) => {
	const finalPath = absoluteToRelativePath(path, __dirname);
	console.log(`GetGames: \tinput path: ${path},\n\tfinalPath: ${finalPath}`);
	const games = require(finalPath);
	// const games = require(path);
	console.log(games);
	return games;
};