import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Tic Tac Toe', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	// 1. Initial State Engine Render
	test('renders initial configuration with Two Player mode operational and scoreboards reset', () => {
		render(<App />);
		expect(screen.getByText('Turn: Player X')).toBeInTheDocument();
		expect(screen.getByText('Player X Wins:')).toBeInTheDocument();
		expect(screen.getByText(/Undo/i)).toBeDisabled(); // Disabled on index 0
	});

	// 2. Click Handling and Alternating Turns
	test('executes valid moves onto cell matrices and shifts turn tracking indicators correctly', () => {
		render(<App />);
		const cells = screen.getAllByRole('gridcell', { name: /cell at Row/i });

		fireEvent.click(cells[0]); // Player X captures index 0
		expect(cells[0]).toHaveTextContent('X');
		expect(screen.getByText('Turn: Player O')).toBeInTheDocument();
	});

	// 3. Grid Cell Interlocking
	test('rejects secondary clicks onto pre-occupied coordinates and keeps target turns unchanged', () => {
		render(<App />);
		const cells = screen.getAllByRole('gridcell', { name: /cell at Row/i });

		fireEvent.click(cells[0]); // Player X captures index 0
		fireEvent.click(cells[0]); // Player O attempts to override index 0

		expect(cells[0]).toHaveTextContent('X');
		expect(screen.getByText('Turn: Player O')).toBeInTheDocument(); // Turn remains locked
	});

	// 4. Session Board State Flush
	test('Reset button flushes match logs and turn flags without downscaling saved scores', () => {
		render(<App />);
		const cells = screen.getAllByRole('gridcell', { name: /cell at Row/i });

		fireEvent.click(cells[0]);
		fireEvent.click(screen.getByText('Reset'));

		expect(cells[0]).toHaveTextContent('');
		expect(screen.getByText('Turn: Player X')).toBeInTheDocument();
	});

	// 5. Granular Undo Pipeline (Two-Player Topology)
	test('reverts actions slice-by-slice backwards during 2-Player configurations', () => {
		render(<App />);
		const cells = screen.getAllByRole('gridcell', { name: /cell at Row/i });

		fireEvent.click(cells[0]); // X plays
		fireEvent.click(cells[1]); // O plays

		expect(cells[1]).toHaveTextContent('O');

		fireEvent.click(screen.getByText('Undo'));
		expect(cells[1]).toHaveTextContent('');
		expect(screen.getByText('Turn: Player O')).toBeInTheDocument();
	});

	// 6. Dual-Frame Undo Pipeline (Computer Opponent Topology)
	test('reverts human triggers and computer responses simultaneously inside AI settings', async () => {
		render(<App />);

		// Switch to Computer mode
		fireEvent.click(screen.getByText('Vs Computer Mode'));
		const cells = screen.getAllByRole('gridcell', { name: /cell at Row/i });

		// Human plays X on position 0
		fireEvent.click(cells[0]);
		expect(cells[0]).toHaveTextContent('X');

		// Fast forward to resolve AI background calculations
		act(() => {
			jest.advanceTimersByTime(400);
		});

		// Verify computer automatically made a countermove
		const occupiedCellsCount = cells.filter(
			(c) => c.textContent !== '',
		).length;
		expect(occupiedCellsCount).toBe(2); // Position 0 (X) + Computer Position (O)

		// Undo must trigger a paired cleanup extraction
		fireEvent.click(screen.getByText('Undo'));

		const clearedCellsCount = cells.filter(
			(c) => c.textContent !== '',
		).length;
		expect(clearedCellsCount).toBe(0); // Both moves correctly purged
		expect(screen.getByText('Turn: Player X')).toBeInTheDocument();
	});

	// 7. Post-Match Command Interlocking
	test('locks game controls completely upon processing a victory condition', () => {
		render(<App />);
		const cells = screen.getAllByRole('gridcell', { name: /cell at Row/i });

		// Craft sequence for Row 1 Win: X(0), O(3), X(1), O(4), X(2)
		fireEvent.click(cells[0]); // X
		fireEvent.click(cells[3]); // O
		fireEvent.click(cells[1]); // X
		fireEvent.click(cells[4]); // O
		fireEvent.click(cells[2]); // X -> Game finishes

		expect(screen.getByText(/Winner: Player X!/i)).toBeInTheDocument();

		// Attempt exploit execution post-match
		fireEvent.click(cells[8]);
		expect(cells[8]).toHaveTextContent(''); // Move is rejected
	});
});
