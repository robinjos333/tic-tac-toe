import { memo } from 'react';
import { getPositionText } from '../utils/gameUtil';

// 1. Isolated and Memoized individual cell element
const BoardCell = memo(
	({ idx, cellValue, isWinningCell, isDisabled, onCellClick }) => {
		const rowNumber = Math.floor(idx / 3) + 1;
		const colNumber = (idx % 3) + 1;

		return (
			<button
				role="gridcell"
				aria-rowindex={rowNumber}
				aria-colindex={colNumber}
				aria-selected={cellValue !== null}
				aria-label={`${cellValue ? cellValue : 'Empty'} cell at ${getPositionText(idx)}`}
				disabled={isDisabled}
				onClick={() => onCellClick(idx)}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '36px',
					fontWeight: 'bold',
					backgroundColor: isWinningCell ? '#d4edda' : '#ffffff',
					// High contrast colors targeting WCAG AA compliance (4.5:1 ratio)
					color: cellValue === 'X' ? '#005A9C' : '#C5221F',
					borderColor: isWinningCell ? '#218838' : '#dee2e6',
					borderStyle: 'solid',
					borderWidth: '2px',
					borderRadius: '8px',
					cursor: isDisabled ? 'not-allowed' : 'pointer',
					outlineOffset: '2px', // Clean layout visible focus ring for keyboard users
				}}
			>
				{cellValue}
			</button>
		);
	},
);

// Explicit DisplayName assignment for clear tracking profiles in React Developer Tools
BoardCell.displayName = 'BoardCell';

// 2. Parent grid orchestrator component
export default function Board({
	board,
	winningLine,
	onCellClick,
	isGameOver,
	isComputerThinking,
}) {
	return (
		<div
			role="grid"
			aria-label="Tic Tac Toe Game Board"
			aria-colcount="3"
			aria-rowcount="3"
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '10px',
				width: '300px',
				height: '300px',
				marginBottom: '20px',
			}}
		>
			{board.map((cellValue, idx) => {
				const isWinningCell = !!(
					winningLine && winningLine.includes(idx)
				);
				const isDisabled =
					cellValue !== null || isGameOver || isComputerThinking;

				return (
					<BoardCell
						key={idx}
						idx={idx}
						cellValue={cellValue}
						isWinningCell={isWinningCell}
						isDisabled={isDisabled}
						onCellClick={onCellClick}
					/>
				);
			})}
		</div>
	);
}
