exports.checkIfMoveLegal = (move) => {
	return /[a-h][1-8]/.test(move);
};