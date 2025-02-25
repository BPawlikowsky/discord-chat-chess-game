import { randomUUID } from "node:crypto";
import { gameConstants } from "../helpers/gameConstants.js";
import { Game } from "./Game.js";
import { gamePersistanceHandler } from "./gamePersistanceHandler.js";

const { CLOSED, OPEN, OPENING_POSITIONS } = gameConstants;

const createGameManagerApi = () => {
  const { readGame, loadGames, createGame, saveGames, saveGame } =
    gamePersistanceHandler();

  const games = loadGames();

  //----------------------------
  const getGames = () => games;

  const getOpenGames = () => {
    const openGames = games.filter((game) => game.getStatus() === OPEN);
    return openGames;
  };

  const setGameOver = (gameObj) => {
    const newGameObject = gameObj;
    newGameObject.isGameOver = true;
    const game = games.find((el) => el.getId() === gameObj.id);
    // game.getGame().
    return newGameObject;
  };

  const checkIfMoveLegal = (move) => /[a-h][1-8]/.test(move);

  const getOptions = (optionsString) => {
    const options = optionsString.split(" ");
    return options;
  };
  const getRegisteredPlayers = (path) => {
    const gameObj = readGame(path);
    if (gameObj?.players) return gameObj.players;
    return [];
  };

  /** @param {string} username */
  const newGame = (username) => {
    const newGame = new Game(
      randomUUID(),
      [username],
      { playerIndex: 0, roundNumber: 0 },
      [],
      OPENING_POSITIONS,
    );
    const newGameItem = createGame(newGame.getGameAsJSON());
    newGameItem.setGame(newGame);
    games.push(newGameItem);
    saveGames(games);
  };

  /** @param {import("./types.js").GameAsJSON} state */
  const updateGameState = (state) => {
    const { id, gameState, moves, players, round } = state;
    const gameItem = games.find((game) => game.getId() === id);
    gameItem.setGame(new Game(id, players, round, moves, gameState));

    saveGame(gameItem.getGame().getGameAsJSON());
  };

  const joinGame = ({ gameId, username }) => {
    const openGames = games.filter((game) => game.getStatus() === OPEN);
    const [openGameItem] = openGames.filter((game) => game.getId() === gameId);
    const openGame = openGameItem.getGame().getGameAsJSON();
    const updatedGame = new Game(
      openGame.id,
      [...openGame.players, username],
      openGame.round,
      openGame.moves,
      openGame.gameState,
    );
    openGames[0].setGame(updatedGame);
    openGames[0].setStatus(CLOSED);
    saveGames(games);
    saveGame(updatedGame.getGameAsJSON());
  };

  const getClosedGames = () => {
    return games.filter((game) => game.getStatus() === CLOSED);
  };

  const getClosedGamesWithUsername = (username) => {
    return getClosedGames().filter((game) =>
      game.getGame().getPlayers().includes(username),
    );
  };

  const getGameByUsernameAndId = ({ id, username }) => {
    return getClosedGamesWithUsername(username).find(
      (game) => game.getId() === id,
    );
  };

  return {
    getGames,
    getOpenGames,
    setGameOver,
    updateGameState,
    checkIfMoveLegal,
    getOptions,
    getRegisteredPlayers,
    getClosedGamesWithUsername,
    getGameByUsernameAndId,

    newGame,
    joinGame,
  };
};

const gameManagerApi = createGameManagerApi();
export default gameManagerApi;
