export default function Scoreboard({ scores, onResetScores }) {
	const rowStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '8px 0',
		borderBottom: '1px solid #eee',
	};

	return (
		<section
			style={{
				background: '#f8f9fa',
				border: '1px solid #e9ecef',
				borderRadius: '8px',
				padding: '20px',
			}}
			aria-labelledby="scoreboard-title"
		>
			<h3
				id="scoreboard-title"
				style={{
					marginTop: 0,
					borderBottom: '2px solid #005A9C',
					paddingBottom: '5px',
				}}
			>
				Scoreboard
			</h3>

			{/* aria-live="polite" ensures score changes are read automatically to assistive tech */}
			<dl style={{ margin: 0, padding: 0 }} aria-live="polite">
				<div style={rowStyle}>
					<dt>
						<strong>Player X Wins:</strong>
					</dt>
					<dd style={{ margin: 0 }}>{scores.xWins}</dd>
				</div>
				<div style={rowStyle}>
					<dt>
						<strong>Player O Wins:</strong>
					</dt>
					<dd style={{ margin: 0 }}>{scores.oWins}</dd>
				</div>
				<div style={rowStyle}>
					<dt>
						<strong>Draws:</strong>
					</dt>
					<dd style={{ margin: 0 }}>{scores.draws}</dd>
				</div>
			</dl>

			<button
				style={{
					width: '100%',
					marginTop: '15px',
					padding: '8px',
					background: '#d9534f',
					color: '#fff',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
					fontWeight: 'bold',
				}}
				onClick={onResetScores}
				aria-label="Reset all saved wins and draws scores"
			>
				Reset Scoreboard
			</button>
		</section>
	);
}
