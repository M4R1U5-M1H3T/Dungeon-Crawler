import HUD from '../ui/HUD.jsx';
import ChallengeWidget from '../ui/ChallengeWidget.jsx';
import ChallengeWriteWidget from '../ui/ChallengeWriteWidget.jsx';

export default function CombatScreen({ state, actions }) {
  const { player: p, enemy: e, phase, lastOk, challenge, opts, showHint, isSpell, log, writeAnswer } = state;
  if (!e) return null;
  const isBoss = !!e.isBoss;
  const eHp = (e.hp / e.maxHp * 100).toFixed(1);

  return (
    <>
      <HUD player={p} floor={state.floor} onExit={actions.onAbort} />
      <div className="panel">
        <div className="hbar">
          <div>
            <div className="tag" style={isBoss ? { color: 'var(--red)' } : {}}>{isBoss ? '⚠️ BOSS' : '⚔️ LUPTĂ'}</div>
            <div className="ename" style={{ color: isBoss ? 'var(--red)' : 'var(--amb)' }}>{e.sprite} {e.name}</div>
          </div>
          <div style={{ minWidth: 160 }}>
            <div className="bar-wrap">
              <div className="bar"><div className="bar-fill en-bar" style={{ width: `${eHp}%` }} /></div>
              <span className="bar-val" style={{ color: 'var(--red)' }}>{e.hp}/{e.maxHp}</span>
            </div>
            <div className="muted" style={{ fontSize: 10, textAlign: 'right', marginTop: 2 }}>{e.flavor}</div>
          </div>
        </div>

        {phase === 'ACTION' && (
          <>
            {lastOk !== null && (
              <div className="panel info-box" style={{ color: lastOk ? 'var(--g)' : 'var(--red)', marginTop: 8 }}>
                {lastOk ? '✅' : '❌'} {state.msg}
                {!lastOk && challenge && challenge.correctAnswer && (
                  <><br /><span className="muted">✔ Răspuns corect: <span className="c-amb">{challenge.correctAnswer}</span></span></>
                )}
              </div>
            )}
            <div className="grid2" style={{ marginTop: 10 }}>
              <button className="btn amb" onClick={actions.onAttack}>⚔️ ATACĂ<br /><span className="muted">(15+ dmg · răspunde corect)</span></button>
              <button className="btn pur" onClick={actions.onSpell} disabled={p.mp < 20}>🔮 VRAJĂ<br /><span className="muted">(25+ dmg · cost 20 MP)</span></button>
              <button className="btn" onClick={actions.onPotion} disabled={p.potions === 0}>🧪 POȚIUNE<br /><span className="muted">{p.potions}x · +40 HP</span></button>
              <button className="btn red" onClick={actions.onFlee} disabled={isBoss}>🏃 FUGĂ<br /><span className="muted">{isBoss ? 'Nu poți fugi de boss!' : '(10% șansă)'}</span></button>
            </div>
          </>
        )}

        {phase === 'CHALLENGE' && challenge && (
          challenge.type === 'write'
            ? <ChallengeWriteWidget
                challenge={challenge}
                showHint={showHint}
                writeAnswer={writeAnswer}
                onAnswer={actions.onCombatAnswer}
                onHint={actions.onHint}
                onSetWriteAnswer={actions.onSetWriteAnswer}
                canAffordHint={p.gold >= 10}
              />
            : <ChallengeWidget
                challenge={challenge}
                opts={opts}
                showHint={showHint}
                onAnswer={actions.onCombatAnswer}
                onHint={actions.onHint}
              />
        )}
      </div>
      <div className="panel" style={{ padding: '10px 14px' }}>
        <div className="tag" style={{ marginBottom: 4 }}>▸ LOG LUPTĂ</div>
        <div className="log">
          {log.map((l, i) => <div key={i} className={l.cls}>{l.msg}</div>)}
        </div>
      </div>
    </>
  );
}
