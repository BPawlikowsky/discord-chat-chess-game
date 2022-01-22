module.exports = {
	startGameMessage: () => 'Game has been started',
	playerRegMessage: (user, number) => `${user} registered as player ${number}`,
	allPlayersRegMessage: () => 'Cannot register another player, all players registered',
	typoFromMoveMessage: () => 'Typo in "from" coordinate.',
	typoToMoveMessage: () => 'Typo in "to" coordinate.',
	legalMoveMessage: (user, moveFrom, moveTo) => `${user} moves from ${moveFrom} to ${moveTo}`,
	illegalMoveMessage: () => 'Illegal move, try again',
	wrongPlayerMessage: () => 'Wrong player',
};