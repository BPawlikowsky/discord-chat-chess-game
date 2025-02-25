export default {
  startGameMessage: "Game has been started",
  playerAlreadyInGame: "You are already in a active game.",
  /**
   * @param {string} user
   * @param {number} number
   * @returns
   */
  playerRegMessage: (user, number) => `${user} registered as player ${number}`,
  allPlayersRegMessage:
    "Cannot register another player, all players registered",
  typoFromMoveMessage: 'Typo in "from" coordinate.',
  typoToMoveMessage: 'Typo in "to" coordinate.',
  legalMoveMessage: (user, moveFrom, moveTo) =>
    `${user} moves from ${moveFrom} to ${moveTo}`,
  illegalMoveMessage: (moves) => {
    const movesStr = moves.map((el, index) => {
      const movesPerRow = 2;
      if (index === 0 || index % movesPerRow === 0) {
        return `\nfrom: ${el.from} to: ${el.to}`;
      }
      return ` from: ${el.from} to: ${el.to}`;
    });
    const message = `Illegal move, try again\nAvailable moves: ${movesStr}`;
    return message;
  },
  wrongPlayerMessage: "Wrong player",
  titleMessage: (player, turn) =>
    `Current player: ${player} color: ${turn === "b" ? "Black" : "White"}`,
};
