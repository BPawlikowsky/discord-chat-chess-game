import { parse, relative, format } from "path";

const absoluteToRelativePath = (pathToFile, dir) => {
  const pathObject = parse(pathToFile);
  pathObject.dir = relative(dir, pathObject.dir);
  const finalPath = format(pathObject);
  return finalPath;
};

export default absoluteToRelativePath;
