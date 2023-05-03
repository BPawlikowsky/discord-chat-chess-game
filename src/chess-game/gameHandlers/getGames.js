import { readFile } from 'fs/promises';

const getGames = async (pathToFile) => JSON.parse(await readFile(new URL(pathToFile, import.meta.url), 'utf8'));

export default getGames;
