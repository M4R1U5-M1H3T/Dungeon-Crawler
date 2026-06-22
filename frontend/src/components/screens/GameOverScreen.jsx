export default function GameOverScreen({ state, actions }) {
  const { player, floor, roomIdx } = state;
  return (
    <div className="panel ta-c" style={{ margin: 'auto', maxWidth: 480, padding: '40px 24px' }}>
      <div className="title-vt" style={{ color: 'var(--red)', fontSize: 60 }}>GAME OVER</div>
      <div className="sprite c-red">💀</div>
      <div style={{ fontSize: 13, margin: '12px 0' }}>
        <p className="c-txt">{player.name} a căzut în Dungeonul Python...</p>
        <p className="muted">Etaj {floor} · Camera {roomIdx + 1}</p>
      </div>
      <div className="info-box" style={{ marginBottom: 20, textAlign: 'left' }}>
        <div>🏆 Scor final: <span className="c-amb">{player.score}</span></div>
        <div>⚔️ Nivel: <span className="c-amb">{player.level}</span></div>
        <div>💰 Aur colectat: <span className="c-amb">{player.gold}</span></div>
      </div>
      <button className="btn amb full center" style={{ fontSize: 14 }} onClick={actions.onRestart}>↺ ÎNCEARCĂ DIN NOU</button>
    </div>
  );
}
