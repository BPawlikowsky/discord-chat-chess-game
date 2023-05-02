import { parse, relative, format } from 'path';

const absoluteToRelativePath = (pathToFile, dir) => {
  const pathObject = parse(pathToFile);
  pathObject.dir = relative(dir, pathObject.dir);
  const finalPath = format(pathObject);
  console.log(`PATH: ${finalPath}`);
  return finalPath;
};

export default absoluteToRelativePath;
