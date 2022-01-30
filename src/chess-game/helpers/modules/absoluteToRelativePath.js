const path = require('path');

exports.absoluteToRelativePath = (pathToFile, dir) => {
	const pathObject = path.parse(pathToFile);
	pathObject.dir = path.relative(dir, pathObject.dir);
	const finalPath = path.format(pathObject);
	console.log('PATH: ' + finalPath);
	return finalPath;
};