import { access } from 'fs/promises';
import { constants } from 'fs';

const isGameFile = async (path) => {
  try {
    await access(path, constants.F_OK);
    console.log('file exists');
    return true;
  } catch (e) {
    console.log(`file does not exist in path: ${path}`);
    return false;
  }
};

export default isGameFile;
