import { writeFile } from 'fs/promises';

const createWriteFile = async (data, path) => {
  try {
    await writeFile(path, data);
    console.log('created/written file.');
  } catch (err) {
    console.log(`createWriteFile: ${err}`);
  }
};

export default createWriteFile;
