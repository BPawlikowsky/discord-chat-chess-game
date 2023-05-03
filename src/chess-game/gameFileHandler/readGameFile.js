import { readFile } from 'fs/promises';

const readGameFile = async (pathToFile) => {
  const gameObj = JSON.parse(await readFile(new URL(pathToFile, import.meta.url), 'utf8'));
  console.log('readGameFile:', gameObj);
  return gameObj;
};

export default readGameFile;
