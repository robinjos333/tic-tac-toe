import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Scoreboard from './components/ScoreBoard';
import {
	calculateGameState,
	getComputerMove,
	getPositionText,
} from './utils/gameUtil';
import MoveHistory from './components/MoveHistory';

export default function App() {
	const [mode, setMode] = useState('two-player');
	const [board, setBoard] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [history, setHistory] = useState([]);
	const [scores, setScores] = useState(() => {
		const saved = localStorage.getItem('tictactoe_scores');
		return saved ? JSON.parse(saved) : { xWins: 0, oWins: 0, draws: 0 };
	});

	const { winner, line: winningLine, isDraw } = calculateGameState(board);
	const isGameOver = !!winner || isDraw;
	const isComputerThinking = mode === 'computer' && !isXNext && !isGameOver;

	useEffect(() => {
		localStorage.setItem('tictactoe_scores', JSON.stringify(scores));
	}, [scores]);

	const executeMove = useCallback(
		(index, symbol) => {
			const nextBoard = [...board];
			nextBoard[index] = symbol;

			// Using functional state update (prev) to avoid relying on the 'history' state variable directly
			setHistory((prev) => [
				...prev,
				{
					boardState: board,
					isXNext: isXNext,
					moveDetails: {
						moveNumber: prev.length + 1, // 👈 Safe length calculation using the previous state reference
						player: symbol,
						position: getPositionText(index),
					},
				},
			]);

			setBoard(nextBoard);
			setIsXNext(symbol === 'X' ? false : true);
		},
		[board, isXNext],
	); // Only depends on the active board snapshot and current turn flag

	useEffect(() => {
		if (isComputerThinking) {
			const timer = setTimeout(() => {
				const compMove = getComputerMove(board);
				if (compMove !== null) executeMove(compMove, 'O');
			}, 400);

			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board, isXNext, mode, isGameOver]);

	useEffect(() => {
		if (winner === 'X')
			setScores((prev) => ({ ...prev, xWins: prev.xWins + 1 }));
		else if (winner === 'O')
			setScores((prev) => ({ ...prev, oWins: prev.oWins + 1 }));
		else if (isDraw)
			setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
	}, [winner, isDraw]);

	const handleCellClick = useCallback(
		(index) => {
			// 1. Defensively prevent clicks on occupied cells, post-game states, or during AI calculations
			if (board[index] || isGameOver || isComputerThinking) return;

			// 2. Safely delegate move execution to your established history-tracking pipeline
			executeMove(index, isXNext ? 'X' : 'O');
		},
		[board, isGameOver, isComputerThinking, isXNext, executeMove],
	);

	const handleUndo = () => {
		if (history.length === 0) return;
		if (mode === 'two-player') {
			const prev = history[history.length - 1];
			setBoard(prev.boardState);
			setIsXNext(prev.isXNext);
			setHistory((prevList) => prevList.slice(0, -1));
		} else if (mode === 'computer') {
			if (history.length >= 2) {
				const prev = history[history.length - 2];
				setBoard(prev.boardState);
				setIsXNext(prev.isXNext);
				setHistory((prevList) => prevList.slice(0, -2));
			} else {
				setBoard(Array(9).fill(null));
				setIsXNext(true);
				setHistory([]);
			}
		}
	};

	const clearSession = () => {
		setBoard(Array(9).fill(null));
		setIsXNext(true);
		setHistory([]);
	};

	const changeMode = (targetMode) => {
		setMode(targetMode);
		clearSession();
	};

	const btnStyle = {
		padding: '10px 16px',
		border: '1px solid #ccc',
		background: '#fff',
		borderRadius: '6px',
		cursor: 'pointer',
		fontWeight: '600',
		fontSize: '14px',
		flex: 1,
	};
	const activeBtnStyle = {
		...btnStyle,
		background: '#005A9C',
		color: '#fff',
		border: 'none',
	};

	return (
		<div
			style={{
				fontFamily: 'Segoe UI, sans-serif',
				maxWidth: '900px',
				margin: '0 auto',
				padding: '20px',
			}}
		>
			<header style={{ textAlign: 'center', marginBottom: '20px' }}>
				<h1 style={{ color: '#005A9C', margin: '0 0 5px 0' }}>
					Tic Tac Toe Engine
				</h1>
			</header>

			{/* Mode selection buttons wrapped inside an accessible navigation toolbar landmark */}
			<nav
				role="toolbar"
				aria-label="Game Mode Configuration"
				style={{
					display: 'flex',
					gap: '10px',
					maxWidth: '400px',
					margin: '0 auto 25px auto',
				}}
			>
				<button
					aria-pressed={mode === 'two-player'}
					style={mode === 'two-player' ? activeBtnStyle : btnStyle}
					onClick={() => changeMode('two-player')}
				>
					Two Player Mode
				</button>
				<button
					aria-pressed={mode === 'computer'}
					style={mode === 'computer' ? activeBtnStyle : btnStyle}
					onClick={() => changeMode('computer')}
				>
					Vs Computer Mode
				</button>
			</nav>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '30px',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div
						role="status"
						aria-live="polite"
						aria-atomic="true"
						style={{
							fontSize: '18px',
							fontWeight: 'bold',
							marginBottom: '15px',
							minHeight: '27px',
						}}
					>
						{winner && (
							<span style={{ color: '#218838' }}>
								Winner: Player {winner}!
							</span>
						)}
						{!winner && isDraw && (
							<span style={{ color: '#B06000' }}>
								Game ended in a Draw!
							</span>
						)}
						{!winner &&
							!isDraw &&
							`Turn: Player ${isXNext ? 'X' : 'O'}${isComputerThinking ? ' (Thinking...)' : ''}`}
					</div>

					<Board
						board={board}
						winningLine={winningLine}
						onCellClick={handleCellClick}
						isGameOver={isGameOver}
						isComputerThinking={isComputerThinking}
					/>

					<div
						role="group"
						aria-label="Game Actions"
						style={{ display: 'flex', gap: '10px', width: '300px' }}
					>
						<button
							style={btnStyle}
							onClick={handleUndo}
							disabled={history.length === 0 || isGameOver}
							aria-label="Undo last move step"
						>
							Undo
						</button>
						<button
							style={{
								...btnStyle,
								background: '#005A9C',
								color: '#fff',
								border: 'none',
							}}
							onClick={clearSession}
							aria-label="Reset current board map"
						>
							Reset
						</button>
					</div>
				</div>
				<div
					style={{
						flex: '1 1 300px',
						minWidth: '280px',
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
					}}
				>
					<Scoreboard
						scores={scores}
						onResetScores={() =>
							setScores({ xWins: 0, oWins: 0, draws: 0 })
						}
					/>
					<MoveHistory history={history} />
				</div>
			</div>
		</div>
	);
}
