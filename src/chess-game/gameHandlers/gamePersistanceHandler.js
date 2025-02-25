import path, { posix } from "node:path";
import { URL, fileURLToPath } from "node:url";
import { readFileSync, writeFile } from "node:fs";
import { gameConstants } from "../helpers/gameConstants.js";
import { GamesListItem } from "./GamesListItem.js";
import { Game } from "./Game.js";
import Logger from "../helpers/logger.js";

const { OPEN } = gameConstants;

const logger = Logger.getInstance();

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
const GAMES_LIST_PATH = path.normalize(
  posix.join(dirname, "..", "..", "..", "gamesList.json"),
);
const GAMES_PATH = path.normalize(
  posix.join(dirname, "..", "..", "..", "games"),
);

const getGamePath = (id) =>
  path.normalize(posix.join(GAMES_PATH, `${id}.json`));

const errorCallback = (successMessage) => (err) => {
  err ? logger.error({ error: err }) : logger.info(successMessage);
};

export const gamePersistanceHandler = () => {
  /**
   * @param {string} pathToFile
   * @returns {{
   *   id: string;
   *   players: string[];
   *   round: import("./types.js").Round;
   *   moves: import("./types.js").Moves;
   *   gameState: string;
   * }}
   */
  const readGame = (pathToFile) => {
    const file = readFileSync(new URL(pathToFile, import.meta.url), {
      flag: "r",
    });
    if (!file) {
      throw new Error("Failed to load file at " + file);
    }
    const gameObj = JSON.parse(file.toString());
    logger.info("Succesfully read object:", gameObj);
    return gameObj;
  };

  /**
   * @param {string} data
   * @param {string} filePath
   */
  const createWriteFile = (data, filePath) => {
    writeFile(
      filePath,
      data,
      { flag: "w+" },
      errorCallback("File created succesfully"),
    );
  };

  /**
   * @param {{
   *   id: string;
   *   players: string[];
   *   round: import("./types.js").Round;
   *   moves: import("./types.js").Moves;
   *   gameState: string;
   * }} game
   * @returns
   */
  const createGame = (game) => {
    const id = game.id;
    const gamePath = getGamePath(id);
    const data = JSON.stringify(game);
    createWriteFile(data, gamePath);

    const newListItem = new GamesListItem(
      id,
      OPEN,
      gamePath,
      new Game(game.id, game.players, game.round, game.moves, game.gameState),
    );
    return newListItem;
  };

  const saveGame = (gameObj) => {
    const data = JSON.stringify(gameObj);
    createWriteFile(data, getGamePath(gameObj.id));
  };

  const createGameList = () => {
    createWriteFile("", GAMES_LIST_PATH);
    return [];
  };

  const readGameListFile = () => {
    try {
      const result = readFileSync(GAMES_LIST_PATH);
      return result;
    } catch (e) {
      logger.error("File read failed", { error: e });
    }

    return [];
  };

  const isGamesListFile = () => {
    try {
      const result = readGameListFile();
      if (result.length === 0) {
        return false;
      }
      return true;
    } catch (e) {
      logger.error(e);
      return false;
    }
  };

  /** @returns {GamesListItem[]} */
  const loadGames = () => {
    if (!isGamesListFile()) {
      return createGameList();
    }

    /** @type {{ id: string; status: string; path: string }[]} */
    const gameList = JSON.parse(readGameListFile().toString());

    return gameList.map((gameItem) => {
      const gameJSON = readGame(gameItem.path);
      const gameFromJSON = new Game(
        gameJSON.id,
        gameJSON.players,
        gameJSON.round,
        gameJSON.moves,
        gameJSON.gameState,
      );
      return new GamesListItem(
        gameItem.id,
        gameItem.status,
        gameItem.path,
        gameFromJSON,
      );
    });
  };

  /** @param {GamesListItem[]} games */
  const saveGames = (games) => {
    const gamesList = games.map((game) => ({
      id: game.getId(),
      status: game.getStatus(),
      path: game.getPath(),
    }));
    writeFile(
      GAMES_LIST_PATH,
      JSON.stringify(gamesList),
      { flag: "w" },
      errorCallback("Game saved succesfully"),
    );
  };

  return {
    createGame,
    readGame,
    saveGame,
    loadGames,
    saveGames,
  };
};
