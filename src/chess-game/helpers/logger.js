const INFO = "INFO";
const DEBUG = "DEBUG";
const ERROR = "ERROR";

class Logger {
  static #instance = null;

  #getDateString = () =>
    `${new Date().toDateString()} | ${new Date().toLocaleTimeString()}`;

  static getInstance() {
    if (this.#instance === null) {
      this.#instance = new Logger();
    }
    return this.#instance;
  }

  info(...args) {
    this.#print(INFO, ...args);
  }

  debug(...args) {
    this.#print(DEBUG, ...args);
  }

  error(...args) {
    this.#print(ERROR, ...args);
  }

  #print(type, ...messages) {
    messages.forEach((message) => {
      if (typeof message === "object") {
        console.log(`[INFO | ${this.#getDateString()} ]: ${typeof message}`);
        console.log(message);
        return;
      }
      console.log(`[INFO | ${this.#getDateString()} ]: ${message}`);
    });
  }
}

export default Logger;
