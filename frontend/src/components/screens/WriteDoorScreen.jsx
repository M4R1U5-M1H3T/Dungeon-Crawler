import HUD from '../ui/HUD.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import ChallengeWriteWidget from '../ui/ChallengeWriteWidget.jsx';

export default function WriteDoorScreen({ state, actions }) {
  const { challenge, showHint, lastOk, doorDmg, writeAnswer, player } = state;
  if (!challenge) return null;
  const stars = '⭐'.repeat(challenge.difficulty);

  return (
    <>
      <HUD player={player} floor={state.floor} />
      <ProgressBar state={state} />
      <div className="panel">
        <div className="hbar" style={{ marginBottom: 8 }}>
          <div>
            <div className="tag" style={{ color: 'var(--cyn)' }}>✍️ UȘA SCRIPTORILOR · {stars}</div>
          </div>
          <div className="tag">SCRIERE COD</div>
        </div>
        {lastOk === false && (
          <div className="info-box" style={{ color: 'var(--red)', marginBottom: 8 }}>
            ❌ Greșit! Ai primit <b>{doorDmg} damage</b>. Mai încearcă!
            {challenge.correctAnswer && <> Răspunsul corect: <span className="c-amb">{challenge.correctAnswer}</span></>}
          </div>
        )}
        <ChallengeWriteWidget
          challenge={challenge}
          showHint={showHint}
          writeAnswer={writeAnswer}
          onAnswer={actions.onWriteDoorAnswer}
          onHint={actions.onHintWrite}
          onSetWriteAnswer={actions.onSetWriteAnswer}
          canAffordHint={player.gold >= 10}
        />
      </div>
    </>
  );
}
