import HUD from '../ui/HUD.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import ChallengeWidget from '../ui/ChallengeWidget.jsx';
import ChallengeWriteWidget from '../ui/ChallengeWriteWidget.jsx';

export default function DoorScreen({ state, actions }) {
  const { challenge, opts, showHint, lastOk, doorDmg, writeAnswer, player } = state;
  if (!challenge) return null;
  const stars = '⭐'.repeat(challenge.difficulty);

  return (
    <>
      <HUD player={player} floor={state.floor} />
      <ProgressBar state={state} />
      <div className="panel">
        <div className="hbar" style={{ marginBottom: 8 }}>
          <div>
            <div className="tag c-blu">🚪 UȘĂ BLOCATĂ · {challenge.topic?.toUpperCase()} · {stars}</div>
          </div>
          <div className="tag">{challenge.type?.replace('_', ' ').toUpperCase()}</div>
        </div>
        {lastOk === false && (
          <div className="info-box" style={{ color: 'var(--red)', marginBottom: 8 }}>
            ❌ Greșit! Ai primit <b>{doorDmg} damage</b>. Mai încearcă!
            {challenge.correctAnswer && <><br />✔ Răspuns corect: <span className="c-amb">{challenge.correctAnswer}</span></>}
          </div>
        )}
        {challenge.type === 'write'
          ? <ChallengeWriteWidget
              challenge={challenge}
              showHint={showHint}
              writeAnswer={writeAnswer}
              onAnswer={actions.onDoorAnswer}
              onHint={actions.onHintWrite}
              onSetWriteAnswer={actions.onSetWriteAnswer}
              canAffordHint={player.gold >= 10}
            />
          : <ChallengeWidget
              challenge={challenge}
              opts={opts}
              showHint={showHint}
              onAnswer={actions.onDoorAnswer}
              onHint={actions.onHint}
            />
        }
      </div>
    </>
  );
}
