import {
	calculateGameState,
	getComputerMove,
	getPositionText,
} from './gameUtil';

describe('Tic Tac Toe - Core Game Logic & Utility Tests', () => {
	// 1. Position Mapping Verification
	test('getPositionText correctly maps flat indices to human-readable grid cells', () => {
		expect(getPositionText(0)).toBe('Row 1, Column 1');
		expect(getPositionText(4)).toBe('Row 2, Column 2');
		expect(getPositionText(8)).toBe('Row 3, Column 3');
	});

	// 2. Active Match Validation Engine
	test('calculateGameState detects active ongoing matches safely', () => {
		const activeBoard = ['X', null, 'O', null, 'X', null, null, null, null];
		const state = calculateGameState(activeBoard);
		expect(state.winner).toBeNull();
		expect(state.line).toBeNull();
		expect(state.isDraw).toBe(false);
	});

	// 3. Row Win Metric Matcher
	test('calculateGameState detects horizontal row wins and outputs the matching coordinates', () => {
		const rowWinBoard = ['X', 'X', 'X', 'O', null, 'O', null, null, null];
		const state = calculateGameState(rowWinBoard);
		expect(state.winner).toBe('X');
		expect(state.line).toEqual([0, 1, 2]);
		expect(state.isDraw).toBe(false);
	});

	// 4. Column Win Metric Matcher
	test('calculateGameState detects vertical column wins cleanly', () => {
		const colWinBoard = ['O', 'X', null, 'O', 'X', null, 'O', null, null];
		const state = calculateGameState(colWinBoard);
		expect(state.winner).toBe('O');
		expect(state.line).toEqual([0, 3, 6]);
	});

	// 5. Diagonal Win Metric Matcher
	test('calculateGameState maps descending/ascending cross diagonals accurately', () => {
		const diagonalWinBoard = [
			'X',
			null,
			'O',
			null,
			'X',
			null,
			'O',
			null,
			'X',
		];
		const state = calculateGameState(diagonalWinBoard);
		expect(state.winner).toBe('X');
		expect(state.line).toEqual([0, 4, 8]);
	});

	// 6. Draw Match Evaluation Engine
	test('calculateGameState determines complete grid fill states as a draw if win thresholds are missed', () => {
		const drawBoard = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
		const state = calculateGameState(drawBoard);
		expect(state.winner).toBeNull();
		expect(state.line).toBeNull();
		expect(state.isDraw).toBe(true);
	});

	// 7. Tactical AI: Immediate Victory Condition
	test('getComputerMove selects an immediate winning cell option ahead of any block layers', () => {
		const board = [
			'O',
			'O',
			null, // Index 2 wins the game for O
			'X',
			'X',
			null, // Index 5 blocks X
			null,
			null,
			null,
		];
		expect(getComputerMove(board)).toBe(2);
	});

	// 8. Tactical AI: Immediate Defend/Block Condition
	test('getComputerMove switches execution branches to prioritize blocking X from executing a win', () => {
		const board = [
			'X',
			'X',
			null, // Index 2 prevents X victory
			'O',
			null,
			null,
			null,
			null,
			null,
		];
		expect(getComputerMove(board)).toBe(2);
	});

	// 9. Tactical AI: Positional Tiering Logic (Center & Corners)
	test('getComputerMove grabs center if empty, dropping down to outer margins fallback sequentially', () => {
		const emptyBoard = Array(9).fill(null);
		expect(getComputerMove(emptyBoard)).toBe(4); // Center fallback layer

		const centerFilledBoard = [
			null,
			null,
			null,
			null,
			'X',
			null,
			null,
			null,
			null,
		];
		const chosenCorner = getComputerMove(centerFilledBoard);
		expect([0, 2, 6, 8]).toContain(chosenCorner); // Corner options fallback layer
	});
});
