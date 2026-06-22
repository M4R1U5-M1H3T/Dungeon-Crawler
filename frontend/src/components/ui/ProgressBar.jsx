export default function ProgressBar({ state }) {
  const fl = state.floors.find(f => f.id === state.floor);
  if (!fl) return null;

  return (
    <div className="panel" style={{ padding: '7px 14px' }}>
      <div className="hbar">
        <span className="muted" style={{ fontSize: 11 }}>{fl.name}</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {fl.rooms.map((r, i) => {
            let cls = 'rdot', icon = '·';
            if (i < state.roomIdx)       { cls = 'rdot done'; icon = '✓'; }
            else if (i === state.roomIdx){ cls = 'rdot cur';  icon = r.icon; }
            else if (r.type === 'BOSS')  { cls = 'rdot boss'; icon = '♛'; }
            return <span key={i} className={cls}>{icon}</span>;
          })}
        </div>
        <span className="muted" style={{ fontSize: 11 }}>Camera {state.roomIdx + 1}/{fl.rooms.length}</span>
      </div>
    </div>
  );
}
