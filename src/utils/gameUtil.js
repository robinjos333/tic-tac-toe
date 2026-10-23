export const WINNING_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const CORNERS = [0, 2, 6, 8];

export const getPositionText = (index) => {
	const row = Math.floor(index / 3) + 1;
	const col = (index % 3) + 1;
	return `Row ${row}, Column ${col}`;
};

export const calculateGameState = (board) => {
	for (let combo of WINNING_COMBOS) {
		const [a, b, c] = combo;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return { winner: board[a], line: combo, isDraw: false };
		}
	}
	const isDraw = board.every((cell) => cell !== null);
	return { winner: null, line: null, isDraw };
};

export const getComputerMove = (board) => {
	const findTacticalMove = (player) => {
		for (let combo of WINNING_COMBOS) {
			const values = combo.map((idx) => board[idx]);
			const playerCount = values.filter((v) => v === player).length;
			const nullCount = values.filter((v) => v === null).length;
			if (playerCount === 2 && nullCount === 1) {
				return combo[values.indexOf(null)];
			}
		}
		return null;
	};

	// Rule 1: Can O win immediately?
	let move = findTacticalMove('O');
	if (move !== null) return move;

	// Rule 2: Does X have a winning configuration to block?
	move = findTacticalMove('X');
	if (move !== null) return move;

	// Rule 3: Grab Center
	if (board[4] === null) return 4;

	// Rule 4: Grab free Corner
	const availableCorners = CORNERS.filter((idx) => board[idx] === null);
	if (availableCorners.length > 0) {
		return availableCorners[
			Math.floor(Math.random() * availableCorners.length)
		];
	}

	// Rule 5: Grab any remaining slot
	const availableCells = board
		.map((val, idx) => (val === null ? idx : null))
		.filter((v) => v !== null);
	if (availableCells.length > 0) {
		return availableCells[
			Math.floor(Math.random() * availableCells.length)
		];
	}

	return null;
};
