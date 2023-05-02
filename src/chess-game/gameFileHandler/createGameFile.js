import createWriteFile from './createWriteFile';
import gamePrototype from '../helpers/modules/gameObjectPrototype';

const createGameFile = async (path) => {
  console.log(path);
  const data = JSON.stringify(gamePrototype);
  await createWriteFile(data, path);
};

export default createGameFile;
