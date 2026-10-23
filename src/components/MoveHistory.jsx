export default function MoveHistory({ history }) {
	return (
		<section
			style={{
				background: '#f8f9fa',
				border: '1px solid #e9ecef',
				borderRadius: '8px',
				padding: '20px',
				maxHeight: '230px',
				overflowY: 'auto',
			}}
			aria-labelledby="history-title"
		>
			<h3
				id="history-title"
				style={{
					marginTop: 0,
					borderBottom: '2px solid #005A9C',
					paddingBottom: '5px',
				}}
			>
				Move History
			</h3>

			{history.length === 0 ? (
				<p
					style={{
						color: '#999',
						fontSize: '14px',
						fontStyle: 'italic',
						margin: 0,
					}}
				>
					No moves made yet.
				</p>
			) : (
				<div style={{ overflowX: 'auto' }}>
					<table
						style={{
							width: '100%',
							borderCollapse: 'collapse',
							fontSize: '14px',
						}}
						aria-describedby="history-desc"
					>
						<caption
							id="history-desc"
							style={{
								position: 'absolute',
								width: '1px',
								height: '1px',
								padding: 0,
								margin: '-1px',
								overflow: 'hidden',
								clip: 'rect(0, 0, 0, 0)',
								border: 0,
							}}
						>
							List of execution steps taken during the active
							match session.
						</caption>
						<thead>
							<tr>
								<th
									scope="col"
									style={{
										textAlign: 'left',
										padding: '6px',
										borderBottom: '2px solid #dee2e6',
										color: '#6c757d',
									}}
								>
									No.
								</th>
								<th
									scope="col"
									style={{
										textAlign: 'left',
										padding: '6px',
										borderBottom: '2px solid #dee2e6',
										color: '#6c757d',
									}}
								>
									Player
								</th>
								<th
									scope="col"
									style={{
										textAlign: 'left',
										padding: '6px',
										borderBottom: '2px solid #dee2e6',
										color: '#6c757d',
									}}
								>
									Position
								</th>
							</tr>
						</thead>
						<tbody>
							{history.map((step, idx) => (
								<tr key={idx}>
									{/* scope="row" connects the move number identifier to its row data cells natively */}
									<th
										scope="row"
										style={{
											padding: '6px',
											borderBottom: '1px solid #eee',
											fontWeight: 'normal',
											textAlign: 'left',
										}}
									>
										{step.moveDetails.moveNumber}
									</th>
									<td
										style={{
											padding: '6px',
											borderBottom: '1px solid #eee',
										}}
									>
										<strong>
											{step.moveDetails.player}
										</strong>
									</td>
									<td
										style={{
											padding: '6px',
											borderBottom: '1px solid #eee',
										}}
									>
										{step.moveDetails.position}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
