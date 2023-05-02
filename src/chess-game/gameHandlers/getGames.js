import absoluteToRelativePath from '../helpers/modules/absoluteToRelativePath';

const getGames = async (path) => {
  const finalPath = absoluteToRelativePath(path, __dirname);
  console.log(`GetGames: \tinput path: ${path},\n\tfinalPath: ${finalPath}`);
  const games = await import(finalPath);
  console.log(games);
  return games;
};

export default getGames;
