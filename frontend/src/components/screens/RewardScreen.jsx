import HUD from '../ui/HUD.jsx';

export default function RewardScreen({ state, actions }) {
  const { player, msg, rewardLines, leveledUp } = state;
  return (
    <>
      <HUD player={player} floor={state.floor} />
      <div className="panel ta-c">
        <div className="sprite c-g">🏆</div>
        <div className="ename c-g">VICTORIE!</div>
        <div style={{ fontSize: 13, margin: '6px 0' }}>{msg}</div>
        <hr className="hr" />
        <div className="info-box" style={{ textAlign: 'left', marginBottom: 12 }}>
          {rewardLines.map((r, i) => <div key={i}>✅ {r}</div>)}
        </div>
        {leveledUp && (
          <div style={{ color: 'var(--amb)', fontSize: 13, marginBottom: 12 }}>
            🎉 LEVEL UP! Ești acum Lv.{player.level}!
          </div>
        )}
        <div className="grid2">
          <button className="btn amb center" onClick={actions.onNextRoom}>▸ CAMERA URMĂTOARE</button>
          <button className="btn center" onClick={actions.onGotoShop}>🛒 MAGAZIN ({player.gold} 💰)</button>
        </div>
      </div>
    </>
  );
}
