export default function VictoryScreen({ state, actions }) {
  const { player } = state;
  return (
    <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 480, padding: '40px 24px' }}>
      <div className="title-vt" style={{ color: 'var(--amb)' }}>VICTORIE!</div>
      <div className="sprite c-amb">🏆</div>
      <div style={{ fontSize: 14, margin: '12px 0' }}>
        <p className="c-g">{player.name} a cucerit Dungeonul Python!</p>
        <p className="muted">Marele Maestru al Sintaxei a fost nimicit.</p>
      </div>
      <div className="info-box" style={{ marginBottom: 20, textAlign: 'left' }}>
        <div>🏆 Scor final: <span className="c-amb">{player.score}</span></div>
        <div>⚔️ Nivel final: <span className="c-amb">{player.level}</span></div>
        <div>💰 Aur total: <span className="c-amb">{player.gold}</span></div>
      </div>
      <button className="btn amb full center" style={{ fontSize: 14 }} onClick={actions.onRestart}>↺ JOACĂ DIN NOU</button>
    </div>
  );
}
