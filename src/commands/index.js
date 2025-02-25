import { boardCommand } from "./boardCommand.js";
import { gamesCommand } from "./gamesCommand.js";
import { moveCommmand } from "./moveCommand.js";
import { pingCommand } from "./pingCommand.js";
import { startCommand } from "./startCommand.js";

export const commands = [
  { name: "start", ...startCommand },
  { name: "ping", ...pingCommand },
  { name: "move", ...moveCommmand },
  { name: "board", ...boardCommand },
  { name: "games", ...gamesCommand },
];
