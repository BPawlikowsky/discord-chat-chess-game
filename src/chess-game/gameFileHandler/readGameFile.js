import { absoluteToRelativePath } from '../helpers/index';

const readGameFile = async (pathToFile) => {
  const finalPath = absoluteToRelativePath(pathToFile, __dirname);
  const gameObj = await import(finalPath);
  console.log('readGameFile:', gameObj);
  return gameObj;
};

export default readGameFile;
