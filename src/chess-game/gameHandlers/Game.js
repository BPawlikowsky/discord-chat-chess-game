import { gameConstants } from "../helpers/gameConstants.js";

const { CLOSED } = gameConstants;

export class Game {
  /** @type {string} */
  #id = "";

  /** @type {string[]} */
  #players = [];

  /** @typedef {{ playerIndex: number; roundNumber: number }} Round */
  #round = { playerIndex: 0, roundNumber: 0 };

  /**
   * @typedef {{
   *   user: string;
   *   color: "W" | "B";
   *   from: string;
   *   to: string;
   *   fen: string;
   * }} Move
   *
   *
   * @typedef {Move[]} Moves
   * @type {Moves}
   */
  #moves = [];

  /** @type {string} */
  #gameState = null;

  /**
   * @param {string} id
   * @param {string[]} players
   * @param {Round} round
   * @param {Moves} moves
   * @param {string} gameState
   */
  constructor(id, players, round, moves, gameState) {
    this.#id = id;
    this.#players = players;
    this.#round.playerIndex = round.playerIndex;
    this.#round.roundNumber = round.roundNumber;
    this.#moves = moves;
    this.#gameState = gameState;
  }

  isGameOver() {
    return this.#gameState === CLOSED;
  }

  getPlayers() {
    return this.#players;
  }

  getGameState() {
    return this.#gameState;
  }

  getId() {
    return this.#id;
  }

  getRound() {
    return this.#round;
  }

  getMoves() {
    return this.#moves;
  }

  /** @param {import("../helpers/gameConstants.js").GameState} state */
  setGameState(state) {
    this.#gameState = state;
  }

  /**
   * @typedef {{
   *   id: string;
   *   players: string[];
   *   round: Round;
   *   moves: Moves;
   *   gameState: string;
   * }} GameAsJSON
   * @returns {GameAsJSON}
   */
  getGameAsJSON() {
    return {
      id: this.#id,
      players: this.#players,
      round: this.#round,
      moves: this.#moves,
      gameState: this.#gameState,
    };
  }

  /** @param {Move} move */
  setMoves(move) {
    this.#moves.push(move);
  }
}
