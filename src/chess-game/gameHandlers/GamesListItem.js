export class GamesListItem {
  #id;
  #status;
  #path;
  /** @type {import("./Game.js").Game} */
  #game;

  /**
   * @param {string} id
   * @param {string} status
   * @param {string} path
   * @param {import("./Game.js").Game?} game
   */
  constructor(id, status, path, game = null) {
    this.#id = id;
    this.#path = path;
    this.#status = status;
    this.#game = game;
  }

  /** @param {import("./Game.js").Game} game */
  setGame(game) {
    this.#game = game;
  }

  getGame() {
    return this.#game;
  }

  getId() {
    return this.#id;
  }

  getStatus() {
    return this.#status;
  }

  getPath() {
    return this.#path;
  }

  setStatus(status) {
    this.#status = status;
  }

  setPath(path) {
    this.#path = path;
  }
}
