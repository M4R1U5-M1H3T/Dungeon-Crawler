export default function HUD({ player, floor, onExit }) {
  const hp    = (player.hp / player.maxHp * 100).toFixed(1);
  const mp    = (player.mp / player.maxMp * 100).toFixed(1);
  const xpPct = (player.xp / (player.level * 100) * 100).toFixed(1);

  return (
    <div className="panel" style={{ padding: '10px 14px' }}>
      <div className="hbar" style={{ marginBottom: 7 }}>
        <span className="c-amb" style={{ fontSize: 13 }}>⚔️ {player.name}</span>
        <span className="muted">Lv.{player.level} &nbsp;·&nbsp; Etaj {floor}</span>
        <span className="c-amb" style={{ fontSize: 13 }}>🏆 {player.score}</span>
        {onExit && (
          <button
            onClick={onExit}
            title="Ieși din joc"
            style={{
              background: 'transparent',
              border: '1px solid #3a0000',
              color: 'var(--red)',
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 2,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: 1,
              lineHeight: 1.4,
            }}
          >
            ✕ MENIU
          </button>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div className="bar-wrap">
          <span style={{ fontSize: 11, minWidth: 26 }}>❤️</span>
          <div className="bar"><div className="bar-fill hp-bar" style={{ width: `${hp}%` }} /></div>
          <span className="bar-val">{player.hp}/{player.maxHp}</span>
        </div>
        <div className="bar-wrap">
          <span style={{ fontSize: 11, minWidth: 26 }}>💙</span>
          <div className="bar"><div className="bar-fill mp-bar" style={{ width: `${mp}%` }} /></div>
          <span className="bar-val">{player.mp}/{player.maxMp}</span>
        </div>
      </div>
      <div className="hbar" style={{ marginTop: 7, fontSize: 11 }}>
        <span>🧪 {player.potions} poțiun{player.potions === 1 ? 'e' : 'i'}</span>
        <span className="bar-wrap" style={{ gap: 4, flex: 1, maxWidth: 140, margin: '0 12px' }}>
          <div className="bar" style={{ height: 6 }}>
            <div className="bar-fill" style={{ width: `${xpPct}%`, background: 'linear-gradient(90deg,#664400,var(--amb))' }} />
          </div>
        </span>
        <span>XP {player.xp}/{player.level * 100}</span>
        <span>💰 {player.gold}</span>
        {player.streak >= 2 && <span className="c-amb blink">🔥×{player.streak}</span>}
      </div>
    </div>
  );
}
