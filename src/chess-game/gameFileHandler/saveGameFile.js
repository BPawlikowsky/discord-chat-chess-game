import createWriteFile from './createWriteFile';

const saveGameFile = async (gameObj, path) => {
  const data = JSON.stringify(gameObj);
  await createWriteFile(data, path);
};

export default saveGameFile;
