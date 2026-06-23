import HUD from '../ui/HUD.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';

export default function ExploreScreen({ state, actions }) {
  const fl = state.floors.find(f => f.id === state.floor);
  if (!fl) return null;
  const room = fl.rooms[state.roomIdx];
  const enemy = (room.type === 'COMBAT' || room.type === 'BOSS')
    ? state.enemies.find(e => e.id === room.id)
    : null;
  const isBoss = room.type === 'BOSS';

  return (
    <>
      <HUD player={state.player} floor={state.floor} onExit={actions.onAbort} />
      <ProgressBar state={state} />
      {state.msg && (
        <div className="panel info-box" style={{ color: state.msgCls === 'danger' ? 'var(--red)' : state.msgCls === 'success' ? 'var(--g)' : 'var(--blu)' }}>
          {state.msg}
        </div>
      )}
      {state.leveledUp && (
        <div className="panel ta-c" style={{ borderColor: 'var(--amb)', color: 'var(--amb)' }}>
          🎉 LEVEL UP! Ești acum Lv.{state.player.level}! +15 Max HP · +10 Max MP
        </div>
      )}

      {(room.type === 'COMBAT' || room.type === 'BOSS') && enemy && (
        <div className="panel ta-c">
          <div className="tag" style={isBoss ? { color: 'var(--red)' } : {}}>{isBoss ? '⚠️ BOSS' : '👁 INAMIC'}</div>
          <div className="sprite" style={{ color: isBoss ? 'var(--red)' : 'var(--amb)' }}>{enemy.sprite}</div>
          <div className="ename" style={{ color: isBoss ? 'var(--red)' : 'var(--amb)' }}>{enemy.name}</div>
          <div className="muted" style={{ margin: '6px 0' }}>{enemy.flavor}</div>
          <hr className="hr" />
          <button className={`btn ${isBoss ? 'red' : 'amb'} full center`} style={{ fontSize: 14 }} onClick={actions.onEnterCombat}>
            {isBoss ? '⚠️ ÎNFRUNTĂ BOSS-UL' : '⚔️ ÎNCEPE LUPTA'}
          </button>
        </div>
      )}

      {room.type === 'DOOR' && (
        <div className="panel ta-c">
          <div className="tag c-blu">🔐 UȘĂ BLOCATĂ</div>
          <div className="sprite c-blu">🚪</div>
          <div className="ename c-blu">Ușă Magică</div>
          <div className="muted" style={{ margin: '6px 0' }}>Sigilată cu cod Python corupt. Rezolvă challenge-ul!</div>
          <div className="info-box" style={{ margin: '8px auto', maxWidth: 300 }}>
            📚 Subiect: <span className="c-amb">{room.topic?.toUpperCase()}</span>
          </div>
          <hr className="hr" />
          <button className="btn blu full center" style={{ fontSize: 14 }} onClick={actions.onEnterDoor}>🔓 DEZLEAGĂ UȘA</button>
        </div>
      )}

      {room.type === 'WRITE_DOOR' && (
        <div className="panel ta-c">
          <div className="tag c-cyn">✍️ UȘĂ SCRIPTORILOR</div>
          <div className="sprite c-cyn">✍️</div>
          <div className="ename c-cyn">Ușa Codului Scris</div>
          <div className="muted" style={{ margin: '6px 0' }}>Trebuie să scrii cod Python corect pentru a o deschide!</div>
          <div className="info-box" style={{ margin: '8px auto', maxWidth: 300 }}>
            ✏️ Tip: <span className="c-cyn">SCRIERE COD</span> &nbsp;·&nbsp; Hint costă <span className="c-amb">10 💰</span>
          </div>
          <hr className="hr" />
          <button className="btn full center" style={{ borderColor: 'var(--cyn)', color: 'var(--cyn)', fontSize: 14 }} onClick={actions.onEnterWriteDoor}>
            ✍️ DEZLEAGĂ UȘA
          </button>
        </div>
      )}

      {room.type === 'TREASURE' && (
        <div className="panel ta-c">
          <div className="tag c-amb">💎 CAMERĂ COMORI</div>
          <div className="sprite c-amb">💎</div>
          <div className="ename c-amb">Cameră Comori</div>
          <div className="muted" style={{ margin: '6px 0' }}>Ai găsit o cameră cu recompense!</div>
          <div className="info-box" style={{ margin: '8px auto', maxWidth: 300 }}>
            🧪 +{room.potions} poțiun{room.potions > 1 ? 'i' : 'e'} &nbsp;·&nbsp; 💰 +{room.gold} aur &nbsp;·&nbsp; +100 scor
          </div>
          <hr className="hr" />
          <button className="btn amb full center" style={{ fontSize: 14 }} onClick={actions.onCollect}>💎 COLECTEAZĂ</button>
        </div>
      )}
    </>
  );
}
